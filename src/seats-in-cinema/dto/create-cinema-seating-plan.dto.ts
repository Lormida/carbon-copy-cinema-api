import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { IMatrixSeatPos, ISeatPos } from '../../utils/seatsInCinema/types'

class SeatPosition implements ISeatPos {
  @IsInt()
  @ApiProperty()
  row: number

  @IsInt()
  @ApiProperty()
  col: number
}

class MatrixSeatPositions implements IMatrixSeatPos {
  @IsInt()
  @ApiProperty()
  colStart: number

  @IsInt()
  @ApiProperty()
  colEnd: number

  @IsInt()
  @ApiProperty()
  rowStart: number

  @IsInt()
  @ApiProperty()
  rowEnd: number
}

export class CreateCinemaSeatingSchemaDto {
  @IsInt()
  @ApiProperty({ example: 4 })
  colLength: number

  @IsInt()
  @ApiProperty({ example: 3 })
  rowLength: number

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => SeatPosition)
  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: SeatPosition,
    example: [
      { row: 1, col: 1 },
      { row: 1, col: 4 },
      { row: 3, col: 1 },
      { row: 3, col: 4 },
    ],
  })
  positionsExclude?: SeatPosition[]

  @ValidateNested({ each: true })
  @Type(() => MatrixSeatPositions)
  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: MatrixSeatPositions,
    example: [
      {
        colStart: 2,
        colEnd: 3,
        rowStart: 2,
        rowEnd: 2,
      },
    ],
  })
  areasExclude?: MatrixSeatPositions[]
}
