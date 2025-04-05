variable "web_origin_bucket_name" {
  type = string
  description = "The name of the bucket"
}

variable "image_bucket_name" {
  type = string
  description = "The name of image bucket"
}

variable "reduced_image_bucket_name" {
  type = string
  description = "The name of reduced images bucket"
}

variable "image_changes_topic_name" {
  type = string
  description = "The name of sns topic for receiving image changes"
}

variable "image_changes_queue_name" {
  type = string
  description = "The name of sqs queue for receiving image changes"
}

variable "image_reducer_lambda_dlq_name" {
  type = string
  description = "The name of dead letter sqs queue for image reducer lambda"
}

variable "region" {
  type = string
  description = "AWS Region"
  default     = "us-east-1"
}

