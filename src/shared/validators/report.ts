import { IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { Limit } from '@/shared/config'

export enum ReportType {
  hole = 'hole',
  comment = 'comment',
  reply = 'reply',
}

export class ReportValidator {
  @IsEnum(ReportType)
  @IsOptional()
  type: ReportType

  @Length(Limit.reportReasonMinLength, Limit.reportReasonMaxLength, {
    message: `举报理由长度必须在${Limit.reportReasonMinLength}到${Limit.reportReasonMaxLength}之间`,
  })
  @IsString()
  reason: string

  @IsNumber()
  @IsOptional()
  holeId?: number

  @IsString()
  @IsOptional()
  commentId?: string

  @IsString()
  @IsOptional()
  replyId?: string
}
