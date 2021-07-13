import subprocess
import time

git_pull = subprocess.run(["git", "pull"])
print('git pulled')
pm2_restart = subprocess.run(["sudo", "pm2", "restart", "all"])
print("pm2 restarted")

while True:
	time.sleep(300)
	git_pull = subprocess.run(["git", "pull"])
	print('git pulled')
	pm2_restart = subprocess.run(["sudo", "pm2", "restart", "all"])
	print("pm2 restarted")
