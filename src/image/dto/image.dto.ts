import { ApiProperty } from "@nestjs/swagger"

export class ImageDto {
    @ApiProperty()
    image_id: number

    @ApiProperty()
    image_name: string

    @ApiProperty()
    url: string

    @ApiProperty()
    description: string

    @ApiProperty()
    user_id: number
}
