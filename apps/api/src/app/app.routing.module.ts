import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    // DONT FORGET TO IMPORT THE MODULE HERE AND REGISTER BELOW!
    // ExampleConfig123Module,
    RouterModule.register([
      // {
      //   path: "config",
      //   module: ExampleConfig123Module
      // }
    ])
  ]
})
export class AppRoutingModule {
}
