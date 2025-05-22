import { InputType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

@InputType()
export class RegisterLeadInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  mobile!: string;

  @Field()
  @IsNotEmpty()
  postcode!: string;

  @Field(() => [String])
  @ArrayNotEmpty()
  services!: string[];
}