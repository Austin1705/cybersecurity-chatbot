import * as fs from 'fs';
import * as path from 'path';

export class KnowledgeBase {
    private topics: Record<string, string>;

    constructor() {
        this.topics = {};
        this.loadTopics();
    }

    private loadTopics() {
        try {
            const dataPath = path.join(__dirname, '../../data/cybersecurity-topics.json');
            const fileContent = fs.readFileSync(dataPath, 'utf-8');
            const data = JSON.parse(fileContent);
            
            // Build a searchable index
            data.cybersecurity_topics.forEach((topic: any) => {
                this.topics[topic.topic.toLowerCase()] = topic.description;
                // Also index partial matches
                topic.topic.split(' ').forEach((word: string) => {
                    this.topics[word.toLowerCase()] = topic.description;
                });
            });
        } catch (error) {
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

    public getTopicInfo(topic: string): string | null {
        const normalizedTopic = topic.toLowerCase().trim();
        return this.topics[normalizedTopic] || null;
    }

    public searchTopics(query: string): Record<string, string> {
        const results: Record<string, string> = {};
        const queryLower = query.toLowerCase();
        
        for (const [key, value] of Object.entries(this.topics)) {
            if (key.includes(queryLower) || value.toLowerCase().includes(queryLower)) {
                results[key] = value;
            }
        }
        
        return results;
    }

    public updateKnowledgeBase(newTopics: Record<string, string>): void {
        this.topics = { ...this.topics, ...newTopics };
    }

    public getAllTopics(): Record<string, string> {
        return { ...this.topics };
    }
}