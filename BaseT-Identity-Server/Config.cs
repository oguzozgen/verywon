// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace IdentityServerWithAspNetIdentity
{
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()                
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                //new ApiResource( "verywon-dbservice", "verywon-dbservice")
               new ApiResource
                    {
                        Name = "verywon-dbservice",
                        DisplayName = "Verywon Database Service",
                        Scopes =
                        {    
                            new Scope()
                            {
                                Name = "verywon-dbservice",
                                DisplayName = "Full access to API 2"
                            },
                            new Scope()
                            {
                                Name = "verywon-dbservice.merhabain",
                                DisplayName = "merhabain access to API 2"
                            },                     
                        }
                    }               
            };
        }

        // AccessTokenLifetime = 3600 * 24,

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "spa",
                    ClientName = "SinglePage",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,
                   
                    //WARNING Token lifetimes Changed Care the effects
                    AbsoluteRefreshTokenLifetime =  60 * 30,//30 mins
                    AccessTokenLifetime = 60 * 5,//5 mins
                    SlidingRefreshTokenLifetime = 60 * 15, // 15 mins

                    RedirectUris = { 
                        "http://localhost:5100/authentication/callback",
                         "http://localhost:5100/authentication/silent_callback",
                    },
                    PostLogoutRedirectUris = 
                    { 
                        "http://localhost:5000/account/login"
                    },
                    AllowedCorsOrigins = { "http://localhost:5100" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "verywon-dbservice"

                    },
                },
                 new Client
                {
                    ClientId = "native.code",
                    ClientName = "Native Client (Code with PKCE)",
                    RequireClientSecret = false,
                    RedirectUris = { "io.identityserver.demo:/oauthredirect" },
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowedScopes = { "openid", "profile" },
                    AllowOfflineAccess = true
                }


            };
        }
    }
}