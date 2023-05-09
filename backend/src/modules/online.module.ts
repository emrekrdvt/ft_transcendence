import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserService } from "src/auth/services/user.service";
import { OnlineGateway } from "src/gateways/online.gateway";
import { OnlineService } from "src/services/online.service";

@Module(
	{
		imports: [ AuthModule ],
		providers: [ OnlineService, OnlineGateway, UserService ]
	}
)
export class OnlineModule {};