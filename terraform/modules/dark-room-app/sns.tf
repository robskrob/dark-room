resource "aws_sns_topic" "image_changes_topic" {
  name = var.image_changes_topic_name
}

resource "aws_sns_topic_subscription" "image_changes_sqs_target" {
  topic_arn = resource.aws_sns_topic.image_changes_topic.arn
  protocol  = "sqs"
  endpoint  = resource.aws_sqs_queue.image_changes_queue.arn
}
