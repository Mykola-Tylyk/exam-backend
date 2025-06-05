import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Clinic API Documentation",
        version: "1.0.0",
        description: "API documentation for clinic services",
    },
    servers: [
        {
            url: "http://localhost:7000",
            description: "Local server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Users",
            description: "Users endpoints",
        },
        {
            name: "Clinics",
            description: "Clinics endpoints",
        },
        {
            name: "Services",
            description: "Services endpoints",
        },
    ],
    paths: {
        "/auth/sign-up": {
            post: {
                tags: ["Auth"],
                summary: "Register new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    telephone: { type: "string" },
                                },
                                required: [
                                    "email",
                                    "password",
                                    "name",
                                    "surname",
                                    "telephone",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                telephone: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/sign-in": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User successfully logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                _id: { type: "string" },
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                telephone: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current user info from token",
                security: [{ bearerAuth: [] }],

                responses: {
                    "200": {
                        description: "Current user information from token",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                _id: { type: "string" },
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                telephone: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Access token refresh",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    refreshToken: { type: "string" },
                                },
                                required: ["refreshToken"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "New access token issued",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/activate/{token}": {
            patch: {
                tags: ["Auth"],
                summary: "Activating your account",
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        description: "Your activation token",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Account successfully activated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        telephone: { type: "string" },
                                        isActive: { type: "boolean" },
                                        isDeleted: { type: "boolean" },
                                        isVerified: { type: "boolean" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/recovery": {
            post: {
                tags: ["Auth"],
                summary: "Password recovery request",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Check your email",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/recovery/{token}": {
            post: {
                tags: ["Auth"],
                summary: "Password recovery",
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        description: "Your action token",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Password restored",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        telephone: { type: "string" },
                                        isActive: { type: "boolean" },
                                        isDeleted: { type: "boolean" },
                                        isVerified: { type: "boolean" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users": {
            get: {
                tags: ["Users"],
                summary: "Get all users",
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Page size",
                        required: false,
                        schema: { type: "integer", format: "int32" },
                    },
                    {
                        name: "page",
                        in: "query",
                        description: "Page",
                        required: false,
                        schema: { type: "integer", format: "int32" },
                    },
                    {
                        name: "userSearch",
                        in: "query",
                        description:
                            "Search users by name, surname, telephone, email",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "clinicSearch",
                        in: "query",
                        description: "Search clinics by name",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "serviceSearch",
                        in: "query",
                        description: "Search services by  specialization",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "userSort",
                        in: "query",
                        description: "Sort users by name, surname",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "clinicSort",
                        in: "query",
                        description: "Sort clinics by name",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "serviceSort",
                        in: "query",
                        description: "Sort services by specialization",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Paginated list of users",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" },
                                        totalPages: { type: "integer" },
                                        prevPage: { type: "boolean" },
                                        nextPage: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                allOf: [
                                                    {
                                                        $ref: "#/components/schemas/User",
                                                    },
                                                    {
                                                        type: "object",
                                                        properties: {
                                                            clinics: {
                                                                type: "array",
                                                                items: {
                                                                    $ref: "#/components/schemas/Clinic",
                                                                },
                                                            },
                                                            services: {
                                                                type: "array",
                                                                items: {
                                                                    $ref: "#/components/schemas/Service",
                                                                },
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },

                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Get user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id user",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Data user",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ["Users"],
                summary: "Update user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id user",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    telephone: { type: "string" },
                                },
                                required: ["name", "surname", "telephone"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Updated user data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Users"],
                summary: "Delete user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id user",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": {
                        description: "No content",
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not Found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{id}/block": {
            patch: {
                tags: ["Users"],
                summary: "Only an admin can block a user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id user",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "User data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 403,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{id}/unblock": {
            patch: {
                tags: ["Users"],
                summary: "Only an admin can unblock a user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id user",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Updated user data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 403,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/clinics": {
            get: {
                tags: ["Clinics"],
                summary: "Get all clinics",
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Page size",
                        required: false,
                        schema: { type: "integer", format: "int32" },
                    },
                    {
                        name: "page",
                        in: "query",
                        description: "Page",
                        required: false,
                        schema: { type: "integer", format: "int32" },
                    },
                    {
                        name: "clinicSearch",
                        in: "query",
                        description: "Search clinics by name",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "serviceSearch",
                        in: "query",
                        description: "Search services by  specialization",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "clinicSort",
                        in: "query",
                        description: "Sort clinics by name",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "serviceSort",
                        in: "query",
                        description: "Sort services by specialization",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Paginated list of clinics",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" },
                                        totalPages: { type: "integer" },
                                        prevPage: { type: "boolean" },
                                        nextPage: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                allOf: [
                                                    {
                                                        $ref: "#/components/schemas/Clinic",
                                                    },
                                                    {
                                                        type: "object",
                                                        properties: {
                                                            services: {
                                                                type: "array",
                                                                items: {
                                                                    $ref: "#/components/schemas/Service",
                                                                },
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Clinics"],
                summary: "Create clinic",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                                required: ["name"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Data clinic",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Clinic",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/clinics/{id}": {
            get: {
                tags: ["Clinics"],
                summary: "Get clinic by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id clinic",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Data clinic",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Clinic",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ["Clinics"],
                summary: "Only an admin can update clinic by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id clinic",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                },
                                required: ["name"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Updated clinic data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Clinic",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 403,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Clinics"],
                summary: "Only an admin can delete clinic by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id clinic",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": {
                        description: "No content",
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not Found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/services": {
            get: {
                tags: ["Services"],
                summary: "Get all services",
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Page size",
                        required: false,
                        schema: { type: "integer", format: "int32" },
                    },
                    {
                        name: "page",
                        in: "query",
                        description: "Page",
                        required: false,
                        schema: { type: "integer", format: "int32" },
                    },
                    {
                        name: "serviceSearch",
                        in: "query",
                        description: "Search services by  specialization",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                    {
                        name: "serviceSort",
                        in: "query",
                        description: "Sort services by specialization",
                        required: false,
                        schema: { type: "string", format: "int32" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Paginated list of service",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" },
                                        totalPages: { type: "integer" },
                                        prevPage: { type: "boolean" },
                                        nextPage: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Service",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Services"],
                summary: "Create service",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    specialization: { type: "string" },
                                    clinicId: { type: "string" },
                                },
                                required: ["name", "clinicId"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Data clinic",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Clinic",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/services/{id}": {
            get: {
                tags: ["Services"],
                summary: "Get service by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id service",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Data service",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Service",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ["Services"],
                summary: "Only an admin can update service by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id service",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    specialization: { type: "string" },
                                },
                                required: ["name"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Updated service data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Clinic",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "403": {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 403,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Services"],
                summary: "Only an admin can delete service by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Id service",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": {
                        description: "No content",
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not Found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 404,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    email: { type: "string", format: "email" },
                    role: { type: "string" },
                    name: { type: "string" },
                    surname: { type: "string" },
                    telephone: { type: "string" },
                    isActive: { type: "boolean" },
                    isDeleted: { type: "boolean" },
                    isVerified: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            Clinic: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    userIds: {
                        type: "array",
                        items: { type: "string" },
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            Service: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    specialization: { type: "string" },
                    userIds: {
                        type: "array",
                        items: { type: "string" },
                    },
                    clinicIds: {
                        type: "array",
                        items: { type: "string" },
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
        },
    },
};

export { swaggerDocument, swaggerUI };
