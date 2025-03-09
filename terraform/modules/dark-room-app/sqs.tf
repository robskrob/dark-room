resource "aws_sqs_queue" "image_changes_queue" {
  name = var.image_changes_queue_name
}
