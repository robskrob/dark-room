data "archive_file" "image_reducer_zip" {
  type        = "zip"
  source_file = "${path.module}/../../../lambdas/image-reducer/image-reducer.js"
  output_path = "${path.module}/../../../lambdas/image-reducer/image-reducer.zip"

}
