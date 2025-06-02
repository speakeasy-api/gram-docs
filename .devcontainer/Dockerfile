FROM node:20

ARG TZ
ENV TZ="$TZ"

# Install basic development tools and iptables/ipset
RUN apt update && apt install -y less \
  git \
  procps \
  sudo \
  fzf \
  zsh \
  man-db \
  unzip \
  gnupg2 \
  gh \
  iptables \
  ipset \
  iproute2 \
  dnsutils \
  aggregate \
  jq \
  curl \
  build-essential \
  lsof

# Ensure default node user has access to /usr/local/share
RUN mkdir -p /usr/local/share/npm-global && \
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history.
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME /commandhistory

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Create workspace directory and set permissions
RUN mkdir -p /workspace && \
  chown -R node:node /workspace

WORKDIR /workspace

RUN ARCH=$(dpkg --print-architecture) && \
  wget "https://github.com/dandavison/delta/releases/download/0.18.2/git-delta_0.18.2_${ARCH}.deb" && \
  sudo dpkg -i "git-delta_0.18.2_${ARCH}.deb" && \
  rm "git-delta_0.18.2_${ARCH}.deb"

# Install mise as root first
RUN curl https://mise.run | sh
ENV PATH="/root/.local/bin:$PATH"

# Set up non-root user
USER node

# Install mise for node user
RUN curl https://mise.run | sh
ENV PATH="/home/node/.local/bin:$PATH"

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=/usr/local/bin:$PATH:/usr/local/share/npm-global/bin:/home/node/.local/bin

# Set the default shell to bash rather than sh
ENV SHELL=/bin/zsh

# Default powerline10k theme
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.0/zsh-in-docker.sh)" -- \
  -p git \
  -p fzf \
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -a "export PATH=\"/home/node/.local/bin:\$PATH\"" \
  -x

# Install Claude
RUN npm install -g @anthropic-ai/claude-code

# Set up mise activation and install tools
RUN echo 'eval "$(/home/node/.local/bin/mise activate zsh)"' >> /home/node/.zshrc

# Copy and set up init script
COPY init.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/init.sh && \
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/init.sh" > /etc/sudoers.d/node-init && \
  chmod 0440 /etc/sudoers.d/node-init
USER node