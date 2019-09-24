import { DeployClient } from "./deploy-client";
import { Config } from "./config"; import * as github from '@actions/github';
import * as actionscore from '@actions/core';

export class GithubDeployClient extends DeployClient {
    public static readonly GITHUB_DOMAIN = "npm.pkg.github.com";
    public constructor(config: Config) {
        super(config);
    }

    public a() {
        const data: string = "//" + GithubDeployClient.GITHUB_DOMAIN + "/:_authToken=" + this.config.GITHUB_SECRET
            + "\nregistry=https://" + GithubDeployClient.GITHUB_DOMAIN + "/" + github.context.actor;
    }
}