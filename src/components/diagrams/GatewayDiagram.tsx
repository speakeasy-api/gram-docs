export default function GatewayDiagram() {
  return (
    <div
      className="gateway-diagram"
      style={{
        maxWidth: "900px",
        margin: "3rem auto",
        padding: "2rem",
        // Assuming your overall page background is black or very dark.
        // If not, you might want to set it here or on a parent container.
        // backgroundColor: "#000",
      }}
    >
      <style>
        {`
          @keyframes flowAnimation {
            0% { transform: translateX(0px); opacity: 0.1; }
            50% { opacity: 1; }
            100% { transform: translateX(500px); opacity: 0.1; }
          }
          
          @keyframes returnAnimation {
            0% { transform: translateX(0px); opacity: 0.1; }
            50% { opacity: 1; }
            100% { transform: translateX(-500px); opacity: 0.1; }
          }
          
          .flow-line-1 {
            animation: flowAnimation 3s infinite;
            animation-delay: 0s;
          }
          
          .flow-line-2 {
            animation: returnAnimation 3s infinite;
            animation-delay: 1.5s;
          }
          
        `}
      </style>
      <svg
        viewBox="0 0 800 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        {/* Static connection lines */}
        <line
          x1="140"
          y1="95"
          x2="620"
          y2="95"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <line
          x1="140"
          y1="105"
          x2="620"
          y2="105"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Animated lines */}
        <line
          x1="140"
          y1="95"
          x2="240"
          y2="95"
          stroke="#fbe332"
          strokeWidth="3"
          className="flow-line-1"
        />
        <line
          x1="640"
          y1="105"
          x2="540"
          y2="105"
          stroke="#fbe332"
          strokeWidth="3"
          className="flow-line-2"
        />

        {/* Boxes - Moved after all lines to ensure they are on top */}
        {/* Your Customer */}
        <rect
          x="20"
          y="70"
          width="120"
          height="60"
          rx="8"
          fill="#1A1A1A"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          className="box-element"
        />
        <text
          x="80"
          y="95"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="500"
        >
          Your
        </text>
        <text
          x="80"
          y="110"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="500"
        >
          Customer
        </text>

        {/* LLM Gateway - Expanded to contain MCP Servers */}
        <rect
          x="270"
          y="50"
          width="220"
          height="100"
          rx="12"
          fill="#222222"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          className="gateway-center box-element"
        />
        <text
          x="380"
          y="75"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="600"
        >
          LLM Gateway
        </text>

        {/* MCP Servers - Inside LLM Gateway */}
        <rect
          x="300"
          y="90"
          width="160"
          height="40"
          rx="6"
          fill="#333333"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          className="box-element"
        />
        <text
          x="380"
          y="115"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="500"
        >
          MCP Servers
        </text>

        {/* Your API */}
        <rect
          x="620"
          y="70"
          width="120"
          height="60"
          rx="8"
          fill="#1A1A1A"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          className="box-element"
        />
        <text
          x="680"
          y="95"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="500"
        >
          Your
        </text>
        <text
          x="680"
          y="110"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="500"
        >
          API
        </text>
      </svg>
    </div>
  );
}
