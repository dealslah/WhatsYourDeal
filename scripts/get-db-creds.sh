#!/bin/bash
mkdir -p packages/backend/.creds && aws secretsmanager get-secret-value --secret-id=wydpassword > packages/backend/.creds/db.json