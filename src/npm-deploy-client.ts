import { DeployClient } from "./deploy-client";
import { Config } from "./config";

export class NPMDeployClient extends DeployClient {

    public constructor(config: Config) {
        super(config);
    }
}