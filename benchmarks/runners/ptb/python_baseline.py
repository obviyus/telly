import json
import platform

print(json.dumps({
    "framework": "python-baseline",
    "ready": True,
    "runtime": f"python {platform.python_version()}",
    "schemaVersion": 1,
    "version": platform.python_version(),
}, separators=(",", ":")))
