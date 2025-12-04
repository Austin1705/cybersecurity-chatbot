"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBase = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class KnowledgeBase {
    constructor() {
        this.topics = {};
        this.loadTopics();
    }
    loadTopics() {
        try {
            const dataPath = path.join(__dirname, '../../data/cybersecurity-topics.json');
            const fileContent = fs.readFileSync(dataPath, 'utf-8');
            const data = JSON.parse(fileContent);
            // Build a searchable index
            data.cybersecurity_topics.forEach((topic) => {
                this.topics[topic.topic.toLowerCase()] = topic.description;
                // Also index partial matches
                topic.topic.split(' ').forEach((word) => {
                    this.topics[word.toLowerCase()] = topic.description;
                });
            });
        }
        catch (error) {
            console.error('Error loading knowledge base:', error);
            // Fallback data
            this.topics = {
                "phishing": "Phishing is a type of cyber attack that attempts to steal sensitive information from users.",
                "malware": "Malware is malicious software designed to harm, exploit, or otherwise compromise a computer system.",
                "ransomware": "Ransomware is a type of malware that encrypts a user's files and demands payment for the decryption key.",
                "firewall": "A firewall is a network security device that monitors and controls incoming and outgoing network traffic.",
                "vpn": "A Virtual Private Network (VPN) extends a private network across a public network, allowing users to send and receive data securely.",
                "encryption": "Encryption is the process of converting information into a code to prevent unauthorized access.",
                "2fa": "Two-Factor Authentication adds an extra security layer to verify your identity before accessing accounts.",
                "password": "Strong passwords are essential for protecting your accounts from unauthorized access.",
                "security": "Cybersecurity refers to the practice of protecting systems and networks from digital attacks."
            };
        }
    }
    getTopicInfo(topic) {
        const normalizedTopic = topic.toLowerCase().trim();
        return this.topics[normalizedTopic] || null;
    }
    searchTopics(query) {
        const results = {};
        const queryLower = query.toLowerCase();
        for (const [key, value] of Object.entries(this.topics)) {
            if (key.includes(queryLower) || value.toLowerCase().includes(queryLower)) {
                results[key] = value;
            }
        }
        return results;
    }
    updateKnowledgeBase(newTopics) {
        this.topics = Object.assign(Object.assign({}, this.topics), newTopics);
    }
    getAllTopics() {
        return Object.assign({}, this.topics);
    }
}
exports.KnowledgeBase = KnowledgeBase;
//# sourceMappingURL=knowledgeBase.js.map