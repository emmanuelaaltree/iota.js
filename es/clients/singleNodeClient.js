"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleNodeClient = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var message_1 = require("../binary/message");
var blake2b_1 = require("../crypto/blake2b");
var arrayHelper_1 = require("../utils/arrayHelper");
var bigIntHelper_1 = require("../utils/bigIntHelper");
var converter_1 = require("../utils/converter");
var writeStream_1 = require("../utils/writeStream");
var clientError_1 = require("./clientError");
/**
 * Client for API communication.
 */
var SingleNodeClient = /** @class */ (function () {
    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     * @param options Options for the client.
     */
    function SingleNodeClient(endpoint, options) {
        var _a;
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = (_a = options === null || options === void 0 ? void 0 : options.basePath) !== null && _a !== void 0 ? _a : "/api/v1/";
        this._powProvider = options === null || options === void 0 ? void 0 : options.powProvider;
        this._timeout = options === null || options === void 0 ? void 0 : options.timeout;
        this._userName = options === null || options === void 0 ? void 0 : options.userName;
        this._password = options === null || options === void 0 ? void 0 : options.password;
        this._authorizationHeader = options === null || options === void 0 ? void 0 : options.authorizationHeader;
        if (this._userName && this._password && !this._endpoint.startsWith("https")) {
            throw new Error("Basic authentication requires the endpoint to be https");
        }
        if (this._userName && this._password && this._authorizationHeader) {
            throw new Error("You can not supply both user/pass and authorization header");
        }
    }
    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    SingleNodeClient.prototype.health = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStatus("/health")];
                    case 1:
                        status = _a.sent();
                        if (status === 200) {
                            return [2 /*return*/, true];
                        }
                        else if (status === 503) {
                            return [2 /*return*/, false];
                        }
                        throw new clientError_1.ClientError("Unexpected response code", "/health", status);
                }
            });
        });
    };
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    SingleNodeClient.prototype.info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "info")];
            });
        });
    };
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    SingleNodeClient.prototype.tips = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "tips")];
            });
        });
    };
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    SingleNodeClient.prototype.message = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages/" + messageId)];
            });
        });
    };
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    SingleNodeClient.prototype.messageMetadata = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages/" + messageId + "/metadata")];
            });
        });
    };
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    SingleNodeClient.prototype.messageRaw = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchBinary("get", "messages/" + messageId + "/raw")];
            });
        });
    };
    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messageSubmit = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var writeStream, messageBytes, nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        writeStream = new writeStream_1.WriteStream();
                        message_1.serializeMessage(writeStream, message);
                        messageBytes = writeStream.finalBytes();
                        if (messageBytes.length > message_1.MAX_MESSAGE_LENGTH) {
                            throw new Error("The message length is " + messageBytes.length + ", which exceeds the maximum size of " + message_1.MAX_MESSAGE_LENGTH);
                        }
                        if (!(!message.nonce || message.nonce.length === 0)) return [3 /*break*/, 6];
                        if (!this._powProvider) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.populatePowInfo()];
                    case 1:
                        _a.sent();
                        if (!(this._networkId && this._minPowScore)) return [3 /*break*/, 3];
                        bigIntHelper_1.BigIntHelper.write8(this._networkId, messageBytes, 0);
                        message.networkId = this._networkId.toString();
                        return [4 /*yield*/, this._powProvider.pow(messageBytes, this._minPowScore)];
                    case 2:
                        nonce = _a.sent();
                        message.nonce = nonce.toString(10);
                        return [3 /*break*/, 4];
                    case 3: throw new Error(this._networkId ? "minPowScore is missing" : "networkId is missing");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        message.nonce = "0";
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.fetchJson("post", "messages", message)];
                    case 7:
                        response = _a.sent();
                        return [2 /*return*/, response.messageId];
                }
            });
        });
    };
    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messageSubmitRaw = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (message.length > message_1.MAX_MESSAGE_LENGTH) {
                            throw new Error("The message length is " + message.length + ", which exceeds the maximum size of " + message_1.MAX_MESSAGE_LENGTH);
                        }
                        if (!(this._powProvider && arrayHelper_1.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.populatePowInfo()];
                    case 1:
                        _a.sent();
                        if (!(this._networkId && this._minPowScore)) return [3 /*break*/, 3];
                        bigIntHelper_1.BigIntHelper.write8(this._networkId, message, 0);
                        return [4 /*yield*/, this._powProvider.pow(message, this._minPowScore)];
                    case 2:
                        nonce = _a.sent();
                        bigIntHelper_1.BigIntHelper.write8(nonce, message, message.length - 8);
                        return [3 /*break*/, 4];
                    case 3: throw new Error(this._networkId ? "minPowScore is missing" : "networkId is missing");
                    case 4: return [4 /*yield*/, this.fetchBinary("post", "messages", message)];
                    case 5:
                        response = _a.sent();
                        return [2 /*return*/, response.messageId];
                }
            });
        });
    };
    /**
     * Find messages by index.
     * @param indexationKey The index value.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messagesFind = function (indexationKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages?index=" + encodeURIComponent(indexationKey))];
            });
        });
    };
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    SingleNodeClient.prototype.messageChildren = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages/" + messageId + "/children")];
            });
        });
    };
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    SingleNodeClient.prototype.output = function (outputId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "outputs/" + outputId)];
            });
        });
    };
    /**
     * Get the address details.
     * @param addressBech32 The address to get the details for.
     * @returns The address details.
     */
    SingleNodeClient.prototype.address = function (addressBech32) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "addresses/" + addressBech32)];
            });
        });
    };
    /**
     * Get the address outputs.
     * @param addressBech32 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    SingleNodeClient.prototype.addressOutputs = function (addressBech32, type, includeSpent) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams;
            return __generator(this, function (_a) {
                queryParams = [];
                if (type !== undefined) {
                    queryParams.push("type=" + type);
                }
                if (includeSpent !== undefined) {
                    queryParams.push("include-spent=" + includeSpent);
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/" + addressBech32 + "/outputs" + this.combineQueryParams(queryParams))];
            });
        });
    };
    /**
     * Get the address detail using ed25519 address.
     * @param addressEd25519 The address to get the details for.
     * @returns The address details.
     */
    SingleNodeClient.prototype.addressEd25519 = function (addressEd25519) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!converter_1.Converter.isHex(addressEd25519)) {
                    throw new Error("The supplied address does not appear to be hex format");
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/ed25519/" + addressEd25519)];
            });
        });
    };
    /**
     * Get the address outputs using ed25519 address.
     * @param addressEd25519 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    SingleNodeClient.prototype.addressEd25519Outputs = function (addressEd25519, type, includeSpent) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams;
            return __generator(this, function (_a) {
                if (!converter_1.Converter.isHex(addressEd25519)) {
                    throw new Error("The supplied address does not appear to be hex format");
                }
                queryParams = [];
                if (type !== undefined) {
                    queryParams.push("type=" + type);
                }
                if (includeSpent !== undefined) {
                    queryParams.push("include-spent=" + includeSpent);
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/ed25519/" + addressEd25519 + "/outputs" + this.combineQueryParams(queryParams))];
            });
        });
    };
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    SingleNodeClient.prototype.milestone = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "milestones/" + index)];
            });
        });
    };
    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    SingleNodeClient.prototype.milestoneUtxoChanges = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "milestones/" + index + "/utxo-changes")];
            });
        });
    };
    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    SingleNodeClient.prototype.peers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "peers")];
            });
        });
    };
    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    SingleNodeClient.prototype.peerAdd = function (multiAddress, alias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("post", "peers", {
                        multiAddress: multiAddress,
                        alias: alias
                    })];
            });
        });
    };
    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    SingleNodeClient.prototype.peerDelete = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
                return [2 /*return*/, this.fetchJson("delete", "peers/" + peerId)];
            });
        });
    };
    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    SingleNodeClient.prototype.peer = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "peers/" + peerId)];
            });
        });
    };
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchStatus = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout("get", route)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.status];
                }
            });
        });
    };
    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchJson = function (method, route, requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorMessage, errorCode, responseData, _a, text, match, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout(method, "" + this._basePath + route, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined)];
                    case 1:
                        response = _c.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _c.sent();
                        if (responseData.error) {
                            errorMessage = responseData.error.message;
                            errorCode = responseData.error.code;
                        }
                        else {
                            return [2 /*return*/, responseData.data];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (!!errorMessage) return [3 /*break*/, 9];
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, response.text()];
                    case 7:
                        text = _c.sent();
                        if (text.length > 0) {
                            match = /code=(\d+), message=(.*)/.exec(text);
                            if ((match === null || match === void 0 ? void 0 : match.length) === 3) {
                                errorCode = match[1];
                                errorMessage = match[2];
                            }
                            else {
                                errorMessage = text;
                            }
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        _b = _c.sent();
                        return [3 /*break*/, 9];
                    case 9: throw new clientError_1.ClientError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : response.statusText, route, response.status, errorCode !== null && errorCode !== void 0 ? errorCode : response.status.toString());
                }
            });
        });
    };
    /**
     * Perform a request for binary data.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchBinary = function (method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout(method, "" + this._basePath + route, { "Content-Type": "application/octet-stream" }, requestData)];
                    case 1:
                        response = _e.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        if (!(method === "get")) return [3 /*break*/, 3];
                        _d = Uint8Array.bind;
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2: return [2 /*return*/, new (_d.apply(Uint8Array, [void 0, _e.sent()]))()];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _e.sent();
                        if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                            return [2 /*return*/, responseData === null || responseData === void 0 ? void 0 : responseData.data];
                        }
                        _e.label = 5;
                    case 5:
                        if (!!responseData) return [3 /*break*/, 7];
                        return [4 /*yield*/, response.json()];
                    case 6:
                        responseData = _e.sent();
                        _e.label = 7;
                    case 7: throw new clientError_1.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
                }
            });
        });
    };
    /**
     * Perform a fetch request.
     * @param method The http method.
     * @param route The route of the request.
     * @param headers The headers for the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchWithTimeout = function (method, route, headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, timerId, userPass, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._timeout !== undefined) {
                            controller = new AbortController();
                            timerId = setTimeout(function () {
                                if (controller) {
                                    controller.abort();
                                }
                            }, this._timeout);
                        }
                        if (this._userName && this._password) {
                            userPass = converter_1.Converter.bytesToBase64(converter_1.Converter.utf8ToBytes(this._userName + ":" + this._password));
                            headers = headers !== null && headers !== void 0 ? headers : {};
                            headers.Authorization = "Basic " + userPass;
                        }
                        if (this._authorizationHeader) {
                            headers = headers !== null && headers !== void 0 ? headers : {};
                            headers.Authorization = this._authorizationHeader;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, fetch("" + this._endpoint + route, {
                                method: method,
                                headers: headers,
                                body: body,
                                signal: controller ? controller.signal : undefined
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1.name === "AbortError" ? new Error("Timeout") : err_1;
                    case 4:
                        if (timerId) {
                            clearTimeout(timerId);
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Combine the query params.
     * @param queryParams The quer params to combine.
     * @returns The combined query params.
     */
    SingleNodeClient.prototype.combineQueryParams = function (queryParams) {
        return queryParams.length > 0 ? "?" + queryParams.join("&") : "";
    };
    /**
     * Get the pow info from the node.
     * @internal
     */
    SingleNodeClient.prototype.populatePowInfo = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var nodeInfo, networkIdBytes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this._networkId || !this._minPowScore)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.info()];
                    case 1:
                        nodeInfo = _b.sent();
                        networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.utf8ToBytes(nodeInfo.networkId));
                        this._networkId = bigIntHelper_1.BigIntHelper.read8(networkIdBytes, 0);
                        this._minPowScore = (_a = nodeInfo.minPowScore) !== null && _a !== void 0 ? _a : 100;
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A zero nonce.
     * @internal
     */
    SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    return SingleNodeClient;
}());
exports.SingleNodeClient = SingleNodeClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBeUU7QUFDekUsNkNBQTRDO0FBaUI1QyxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxvREFBbUQ7QUFDbkQsNkNBQTRDO0FBRzVDOztHQUVHO0FBQ0g7SUE2REk7Ozs7T0FJRztJQUNILDBCQUFZLFFBQWdCLEVBQUUsT0FBaUM7O1FBQzNELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLFNBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsbUNBQUksVUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLG1C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