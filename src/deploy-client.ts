import { Config } from "./config";

export abstract class DeployClient {
    public constructor(protected config: Config) {

    }
    public deploy(): void {

    }
}