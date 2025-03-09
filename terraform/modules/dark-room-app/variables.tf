variable "web_origin_bucket_name" {
  type = string
  description = "The name of the bucket"
}

variable "image_bucket_name" {
  type = string
  description = "The name of image bucket"
}

variable "image_changes_topic_name" {
  type = string
  description = "The name of sns topic for receiving image changes"
}

variable "image_changes_queue_name" {
  type = string
  description = "The name of sqs queue for receiving image changes"
}
