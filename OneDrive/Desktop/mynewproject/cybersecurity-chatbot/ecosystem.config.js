{
  "apps": [
    {
      "name": "cybersecurity-chatbot",
      "script": "./src/index.ts",
      "interpreter": "ts-node",
      "instances": "max",
      "exec_mode": "cluster",
      "watch": false,
      "env": {
        "NODE_ENV": "development",
        "PORT": 3000
      },
      "env_production": {
        "NODE_ENV": "production",
        "PORT": 3000
      },
      "error_file": "./logs/error.log",
      "out_file": "./logs/out.log",
      "log_file": "./logs/combined.log",
      "time": true,
      "merge_logs": true,
      "autorestart": true,
      "max_restarts": 10,
      "min_uptime": "10s",
      "max_memory_restart": "500M",
      "ignore_watch": ["node_modules", "logs", ".env"],
      "args": ""
    }
  ]
}
