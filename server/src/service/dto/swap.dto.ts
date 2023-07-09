import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class SwapDto {
    @IsEthereumAddress()
    @IsNotEmpty()
    readonly toToken: string;
}
