import { ApiProperty } from "@nestjs/swagger"

export class UserDto {
    @ApiProperty()
    user_id: number  
    
    @ApiProperty()
    email: string

    @ApiProperty()
    pass_word: string
    
    @ApiProperty()
    full_name: string
    
    @ApiProperty()
    age: number       
    
    @ApiProperty()
    avatar: string
}
