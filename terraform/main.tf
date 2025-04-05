terraform {
  #############################################################
  ## START COMMENT
  ## AFTER RUNNING TERRAFORM APPLY (WITH LOCAL BACKEND)
  ## YOU WILL UNCOMMENT THIS CODE THEN RERUN TERRAFORM INIT
  ## TO SWITCH FROM LOCAL BACKEND TO REMOTE AWS BACKEND
  #############################################################
  backend "s3" {
    bucket         = "dark-room-app-tf-state"
    key            = "terraform/dark-room-app/production/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "dark-room-app-terraform-state-locking"
    encrypt        = true
  }
  #############################################################
  ## END COMMENT
  #############################################################

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.44.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "dark_room_app_terraform_state" {
  bucket        = "dark-room-app-tf-state"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "terraform_bucket_versioning" {
  bucket = aws_s3_bucket.dark_room_app_terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_crypto_conf" {
  bucket        = aws_s3_bucket.dark_room_app_terraform_state.bucket 
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "dark-room-app-terraform-state-locking"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}

module "dark_room_app_infra" {
  source = "./modules/dark-room-app"

  web_origin_bucket_name = "web-origin-dark-room-app"
  image_bucket_name = "dr-images"
  reduced_image_bucket_name = "dr-reduced-images"
  image_changes_topic_name = "dr-image-changes"
  image_changes_queue_name = "dr-image-changes-queue"
  image_reducer_lambda_dlq_name = "dr-image-reducer-lambda-dlq"
}
