import {
  ArrayMaxSize,
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { Limit } from '@/shared/config'

export class HoleDetailPostComment {
  @Length(Limit.holeCommentBodyMinLength, Limit.holeCommentBodyMaxLength, {
    message: `评论字数限制在${Limit.holeCommentBodyMinLength}-${Limit.holeCommentBodyMaxLength}字`,
  })
  @IsString()
  body: string

  @ArrayMaxSize(Limit.commentMaxImgLength, {
    message: `最多只能上传${Limit.commentMaxImgLength}张图片哦`,
  })
  @IsArray()
  @IsOptional()
  imgs?: string[] = []
}
