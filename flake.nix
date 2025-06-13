{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    workerd = {
      url = "github:getchoo/workerd-docker";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    wrangler = {
      # Use 4.19.1
      url = "github:ryand56/wrangler/1141a859c59e05ceb901d14790f0f75a6c5de3f5";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    {
      nix.settings = {
        substituters = ["https://wrangler.cachix.org"];
        trusted-public-keys = ["wrangler.cachix.org-1:N/FIcG2qBQcolSpklb2IMDbsfjZKWg+ctxx0mSMXdSs="];
      };
    }
    // flake-utils.lib.eachSystem (flake-utils.lib.defaultSystems) (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        workerd = inputs.workerd.packages.${system}.workerd;
        wrangler = inputs.wrangler.packages.${system}.wrangler;
      in {
        # `nix develop`
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            wrangler
          ];
          MINIFLARE_WORKERD_PATH = "${workerd}/bin/workerd";
        };
      }
    );
}

