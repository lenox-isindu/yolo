Vagrant.configure("2") do |config|
  # Use Geerling's Ubuntu 20.04 base box
  config.vm.box = "geerlingguy/ubuntu2004"

  # Set hostname
  config.vm.hostname = "ip3-server"

  # Network (for accessing web app via browser)
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Sync your project directory
  config.vm.synced_folder ".", "/vagrant"

  # Provision basic packages
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update -y
    apt-get install -y python3 python3-pip ansible docker.io
    usermod -aG docker vagrant
  SHELL

  # Provider configuration
  config.vm.provider "virtualbox" do |vb|
    vb.name = "ansible-config-server"
    vb.memory = 2048
    vb.cpus = 2
  end
end
