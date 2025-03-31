resource "aws_s3_bucket" "www_bucket" {
  bucket = var.web_origin_bucket_name
}

resource "aws_s3_bucket_website_configuration" "www_bucket" {
  bucket = aws_s3_bucket.www_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_access_block" {
  bucket = aws_s3_bucket.www_bucket.id

  block_public_acls   = false
  block_public_policy = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.www_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
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


resource "aws_s3_bucket" "image_bucket" {
  bucket = var.image_bucket_name
}

resource "aws_s3_bucket" "reduced_image_bucket" {
  bucket = var.reduced_image_bucket_name
}

data "aws_iam_policy_document" "image_changes_topic_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }

    actions   = ["SNS:Publish"]
    resources = [aws_sns_topic.image_changes_topic.arn]

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = [aws_s3_bucket.image_bucket.arn]
    }
  }
}

# data "aws_iam_policy_document" "image_reducer_lambda_policy" {
#   statement {
#     effect = "Allow"

#     principals {
#       type        = "Service"
#       identifiers = ["s3.amazonaws.com"]
#     }

#     actions   = ["s3:GetObject"]
#     resources = [resource.aws_lambda_function.image_reducer_lambda.arn]

#     condition {
#       test     = "ArnLike"
#       variable = "aws:SourceArn"
#       values   = [aws_s3_bucket.image_bucket.arn]
#     }
#   }
# }

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.image_bucket.id
  topic {
    topic_arn     = aws_sns_topic.image_changes_topic.arn
    events        = ["s3:ObjectCreated:*"]
  }
}

