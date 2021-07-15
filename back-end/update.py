
import subprocess
import time

while True:
	git_pull = subprocess.run(["sudo", "git", "pull"])
	print('git pulled')
	pm2_restart = subprocess.run(["sudo", "pm2", "restart", "all"])
	print("pm2 restarted")
	time.sleep(120)
