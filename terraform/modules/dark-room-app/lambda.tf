resource "aws_lambda_function" "image_reducer_lambda" {
    filename         = "${path.module}/../../../lambdas/image-reducer/image-reducer.zip"
    function_name    = "dark-room-image-reducer"
    role             = "${aws_iam_role.lambda_role.arn}"
    handler          = "image-reducer.handler"
    source_code_hash = "${data.archive_file.image_reducer_zip.output_base64sha256}"
    runtime          = "nodejs20.x"
    timeout          = 60 
    memory_size      = 1536
    layers           = [
      aws_lambda_layer_version.nodejs_sharp_layer.arn,
    ]

    dead_letter_config {
      target_arn = resource.aws_sqs_queue.image_reducer_lambda_dlq.arn
    }
}

resource "aws_iam_role" "lambda_role" {
    name = "LambdaRole"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Principal": {
            "Service": "lambda.amazonaws.com"
        }
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_role_sqs_policy" {
    name = "AllowSQSPermissions"
    role = "${aws_iam_role.lambda_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "sqs:ChangeMessageVisibility",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
        "sqs:ReceiveMessage",
        "sqs:SendMessage"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

# resource "aws_iam_role_policy_attachment" "lambda_s3_read_policy" {

#   role = aws_iam_role.lambda_role.id

#   policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"

# }

resource "aws_iam_role_policy" "lambda_role_s3_policy" {
    name = "AllowS3Permissions"
    role = "${aws_iam_role.lambda_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_role_logs_policy" {
    name = "LambdaRolePolicy"
    role = "${aws_iam_role.lambda_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_lambda_event_source_mapping" "image_reducer_lambda_event_source" {
    event_source_arn = "${resource.aws_sqs_queue.image_changes_queue.arn}"
    enabled          = true
    function_name    = "${aws_lambda_function.image_reducer_lambda.arn}"
    batch_size       = 1
}

resource "aws_lambda_layer_version" "nodejs_sharp_layer" {
  filename   = "${path.module}/../../../lambdas/layers/nodejs_sharp_layer.zip"
  layer_name = "nodejs_sharp_layer"

  compatible_runtimes = ["nodejs20.x"]
}
