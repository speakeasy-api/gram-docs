#!/bin/bash

su -l node -s /bin/bash -c "
    cd /workspace
    /home/node/.local/bin/mise trust
    /home/node/.local/bin/mise install
"
echo '#!/bin/bash' > /usr/local/bin/claude-wrapper
echo '/usr/local/share/npm-global/bin/claude --dangerously-skip-permissions "$@"' >> /usr/local/bin/claude-wrapper   
chmod +x /usr/local/bin/claude-wrapper
ln -sf /usr/local/bin/claude-wrapper /usr/local/bin/claude
