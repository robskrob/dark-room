data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "www_bucket" {
  bucket = "www.${var.web_origin_bucket_name}"
}

resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.www_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_acl" "s3_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.s3_bucket_ownership,
    aws_s3_bucket_public_access_block.bucket_access_block,
  ]

  bucket = aws_s3_bucket.www_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_ownership" {
  bucket = aws_s3_bucket.www_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_cors_configuration" "s3_bucket_cors" {
  bucket = aws_s3_bucket.www_bucket.id

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET"]
    allowed_origins = ["https://www.${var.domain_name}"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_access_block" {
  bucket = aws_s3_bucket.www_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.www_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject",
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject"
        ]
        Resource = [
          "${aws_s3_bucket.www_bucket.arn}/*"
         ]
       }
     ]
   })
}


resource "aws_s3_bucket" "root_bucket" {
  bucket = var.web_origin_bucket_name
}


resource "aws_s3_bucket_website_configuration" "redirect_config" {
  bucket = aws_s3_bucket.root_bucket.id

  redirect_all_requests_to {
    host_name = "www.${var.domain_name}"
    # protocol  = "https"
  }
}

resource "aws_s3_bucket_policy" "root_bucket_policy" {
  bucket = aws_s3_bucket.root_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject",
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject"
        ]
        Resource = [
          "${aws_s3_bucket.root_bucket.arn}/*"
         ]
       }
     ]
   })
}

resource "aws_s3_bucket_acl" "root_s3_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.root_s3_bucket_ownership,
    aws_s3_bucket_public_access_block.root_bucket_access_block,
  ]

  bucket = aws_s3_bucket.root_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_ownership_controls" "root_s3_bucket_ownership" {
  bucket = aws_s3_bucket.root_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "root_bucket_access_block" {
  bucket = aws_s3_bucket.root_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket" "image_bucket" {
  bucket = var.image_bucket_name
}

resource "aws_s3_bucket" "reduced_image_bucket" {
  bucket = var.reduced_image_bucket_name
}

resource "aws_sns_topic_policy" "image_changes_topic_policy_attachment" {
  arn    = aws_sns_topic.image_changes_topic.arn
  policy = data.aws_iam_policy_document.image_changes_topic_policy.json
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.image_bucket.id
  topic {
    topic_arn     = aws_sns_topic.image_changes_topic.arn
    events        = ["s3:ObjectCreated:*"]
  }
}

