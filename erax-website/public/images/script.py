from pathlib import Path

folder = Path('.')

for i,file in enumerate(folder.iterdir()):
	if file.is_file() and not file.name.endswith(".py"):
		name = "erax_img_" + str(i) + ".jpeg"
		target_path = file.with_name(name)
		file.rename(target_path)
		print(f"modified file {name}")	