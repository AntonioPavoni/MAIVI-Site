// home-chatbot.js - Add to your /js folder
document.addEventListener('DOMContentLoaded', function() {
  // Find the project examples section on the home page
  const projectSection = document.getElementById('project-examples');
  
  if (projectSection) {
    // Replace the existing project examples content with our chatbot interface
    const chatbotContent = `
      <h2 class="text-3xl font-semibold mb-6 text-center">Interactive Demo</h2>
      <p class="mb-6 text-center">See how MAIVI transforms text descriptions into architectural models:</p>
      
      <div class="chat-container">
        <div class="chat-header">
          <h3>MAIVI AI Assistant</h3>
          <span>Online</span>
        </div>
        <div class="chat-body" id="chat-body">
          <div class="bot-message">
            Hello! I'm MAIVI's AI assistant. Select a predefined prompt or describe an architectural element, and I'll generate Python code for Rhino/Grasshopper to create it.
          </div>
        </div>
        <div class="chat-input">
          <div class="dropdown-container mb-2">
            <select id="prompt-dropdown" class="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded">
              <option value="">-- Select a predefined prompt --</option>
              <option value="tower">Parametric Tower Design</option>
              <option value="wall">Curved Wall with Windows</option>
              <option value="stair">Spiral Staircase Design</option>
              <option value="facade">Parametric Facade with Panels</option>
            </select>
          </div>
          <input type="text" id="user-input" placeholder="Or type your own architectural description..." />
          <button id="send-button">Send</button>
        </div>
      </div>
    `;
    
    // Replace the project section content
    projectSection.innerHTML = chatbotContent;
    
    // Add link to our custom CSS if not already present
    if (!document.querySelector('link[href="/chatbot-interface.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/chatbot-interface.css';
      document.head.appendChild(link);
    }
    
    // Set up the chat functionality
    setupChatFunctionality();
  }
});

function setupChatFunctionality() {
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const promptDropdown = document.getElementById('prompt-dropdown');
  
  // Sample architectural descriptions for demo
  const samplePrompts = [
    "Create a modern residential building with a green roof and large windows facing south",
    "Design a bridge with three supporting arches spanning a 50-meter river",
    "Generate a museum with a central atrium and five exhibition spaces around it"
  ];
  
  // Set a random placeholder
  userInput.placeholder = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
  
  // Handle dropdown selection
  promptDropdown.addEventListener('change', function() {
    if (this.value) {
      let selectedPrompt = "";
      
      switch(this.value) {
        case 'tower':
          selectedPrompt = "Create a parametric tower with 5 floors, each with a radius of 10 meters, a height of 4 meters per floor, and 8 windows per floor. Add a conical roof.";
          break;
        case 'wall':
          selectedPrompt = "Create a curved wall that is 10 meters long and 3 meters high with a thickness of 0.3 meters. Add 5 rectangular windows evenly spaced along the wall.";
          break;
        case 'stair':
          selectedPrompt = "Create a spiral staircase with 20 steps that winds around a central column with a radius of 1.5 meters.";
          break;
        case 'facade':
          selectedPrompt = "Design a parametric facade with hexagonal panels that vary in size based on their distance from the center.";
          break;
      }
      
      // Set the input value to the selected prompt
      userInput.value = selectedPrompt;
      
      // Reset dropdown
      this.value = "";
    }
  });
  
  // Handle send button click
  sendButton.addEventListener('click', function() {
    sendMessage();
  });
  
  // Handle enter key press
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Disable input while processing
    userInput.disabled = true;
    sendButton.disabled = true;
    promptDropdown.disabled = true;
    
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input
    userInput.value = '';
    
    // Show thinking animation
    addThinkingAnimation();
    
    // Process the message (simulate AI thinking time)
    setTimeout(function() {
      // Remove thinking animation
      const thinking = document.querySelector('.thinking');
      if (thinking) thinking.remove();
      
      // Generate and display code
      generateAndDisplayCode(message);
      
      // Re-enable input
      userInput.disabled = false;
      sendButton.disabled = false;
      promptDropdown.disabled = false;
      userInput.focus();
    }, 2000);
  }
  
  function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function addThinkingAnimation() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking';
    thinkingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(thinkingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function generateAndDisplayCode(prompt) {
    // First, add a message about analyzing the prompt
    addBotMessage("Analyzing your architectural description...");
    
    setTimeout(() => {
      // Generate code based on the prompt
      const generatedCode = generateCodeFromPrompt(prompt);
      
      // Create code message container
      const codeMessageDiv = document.createElement('div');
      codeMessageDiv.className = 'chat-message bot-code-message';
      
      // Add code header
      const codeHeader = document.createElement('div');
      codeHeader.className = 'code-header';
      codeHeader.innerHTML = '<span>Generated Python Code</span><span>Rhino/Grasshopper</span>';
      codeMessageDiv.appendChild(codeHeader);
      
      // Add code content
      const codeContent = document.createElement('pre');
      codeContent.innerHTML = '<code class="language-python"></code>';
      codeMessageDiv.appendChild(codeContent);
      
      // Add to chat
      chatBody.appendChild(codeMessageDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
      
      // Animate code typing
      const codeElement = codeContent.querySelector('code');
      typeCode(codeElement, generatedCode, 0, 20);
      
      // After code is generated, show rendering message
      setTimeout(() => {
        addBotMessage("Generating 3D model from code...");
        
        // Then show the rendering
        setTimeout(() => {
          addRenderedImage();
        }, 2000);
      }, generatedCode.length * 20 + 1000); // Wait for code typing to finish
    }, 1000);
  }
  
  function typeCode(element, code, index, speed) {
    if (index < code.length) {
      element.textContent += code.charAt(index);
      element.parentElement.scrollTop = element.parentElement.scrollHeight;
      setTimeout(() => typeCode(element, code, index + 1, speed), speed);
    } else {
      // Add syntax highlighting class when done
      element.className = 'language-python';
      element.parentElement.scrollTop = element.parentElement.scrollHeight;
    }
  }
  
  function addRenderedImage() {
    // Create image message container
    const imageMessageDiv = document.createElement('div');
    imageMessageDiv.className = 'chat-message bot-image-message';
    
    // Add rendering placeholder
    const renderingPlaceholder = document.createElement('div');
    renderingPlaceholder.className = 'rendering-placeholder';
    renderingPlaceholder.innerHTML = `
      <div class="icon">🏗️</div>
      <div>3D Model Visualization</div>
      <div class="text-sm mt-2">Rendering complete</div>
    `;
    imageMessageDiv.appendChild(renderingPlaceholder);
    
    // Add to chat
    chatBody.appendChild(imageMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Add final message
    setTimeout(() => {
      addBotMessage("Your architectural design has been created! You can now export this to Rhino or convert it to a Revit BIM file.");
    }, 1000);
  }
  
  function generateCodeFromPrompt(prompt) {
    // This function generates Python code based on the user's prompt
    // In a real implementation, this would call your AI model
    
    // Check for predefined prompts first
    if (prompt.toLowerCase().includes('parametric tower') || prompt.toLowerCase().includes('floors') && prompt.toLowerCase().includes('conical roof')) {
      return `import rhinoscriptsyntax as rs
import math

# Create tower base
radius = 10
floor_height = 4
num_floors = 5

# Generate cylinder for each floor
floor_cylinders = []
for i in range(num_floors):
    base_point = (0, 0, i * floor_height)
    height_point = (0, 0, (i + 1) * floor_height)
    cylinder = rs.AddCylinder(base_point, height_point, radius)
    floor_cylinders.append(cylinder)

# Add conical roof
roof_height = radius * math.tan(math.radians(30))
roof_point = (0, 0, num_floors * floor_height + roof_height)
roof = rs.AddCone((0, 0, num_floors * floor_height), roof_point, radius)

# Add windows to each floor
window_width = 2
window_height = 2.5
num_windows = 8
for floor in range(num_floors):
    for i in range(num_windows):
        angle = i * (2 * math.pi / num_windows)
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)
        window_center = (x, y, floor * floor_height + floor_height/2)
        # Create window (simplified as rectangle for this example)
        rs.AddRectangle(rs.PlaneFromNormal(window_center, (x, y, 0)), window_width, window_height)`;
    }
    else if (prompt.toLowerCase().includes('curved wall') || prompt.toLowerCase().includes('windows') && prompt.toLowerCase().includes('evenly spaced')) {
      return `import rhinoscriptsyntax as rs
import math

# Parameters
length = 10
height = 3
thickness = 0.3
num_windows = 5
window_width = 1.2
window_height = 1.5

# Create curved wall
radius = length / (2 * math.sin(math.pi/4))
arc = rs.AddArc(rs.WorldXYPlane(), radius, math.pi/2)
wall = rs.ExtrudeCurve(arc, rs.AddLine([0,0,0], [0,0,height]))
wall = rs.CapPlanarHoles(wall)

# Add windows
curve_params = rs.DivideCurve(arc, num_windows + 1, True, True)
for i in range(1, len(curve_params) - 1):
    param = curve_params[i]
    point = rs.EvaluateCurve(arc, param)
    normal = rs.CurveTangent(arc, param)
    normal = rs.VectorRotate(normal, 90, [0,0,1])
    window_plane = rs.PlaneFromNormal(
        [point[0], point[1], height/2], 
        normal)
    window = rs.AddRectangle(
        window_plane, 
        window_width, 
        window_height)
    rs.BooleanDifference(wall, 
        rs.ExtrudeCurve(window, 
        rs.AddLine([0,0,-thickness/2], 
        [0,0,thickness/2])))`;
    }
    // Simple keyword-based code generation for other prompts
    else if (prompt.toLowerCase().includes('stair') || prompt.toLowerCase().includes('step')) {
      return `import rhinoscriptsyntax as rs
import math

# Creating spiral staircase
def create_staircase():
    # Staircase parameters
    num_steps = 20
    radius = 1.5
    height = 4.0
    step_height = height / num_steps
    
    steps = []
    central_column = rs.AddCylinder(rs.WorldXYPlane(), height, radius * 0.2)
    
    for i in range(num_steps):
        angle = (i / num_steps) * 2 * math.pi * 1.2
        z = i * step_height
        
        # Create step
        center = [radius * math.cos(angle), radius * math.sin(angle), z]
        step_width = 0.9
        step_depth = 0.3
        
        # Create step geometry
        step_plane = rs.PlaneFromNormal(center, [center[0], center[1], 0])
        step = rs.AddRectangle(step_plane, step_width, step_depth)
        step = rs.ExtrudeCurveStraight(step, [0, 0, 0], [0, 0, step_height * 0.2])
        
        steps.append(step)
    
    # Add railing
    railing_points = []
    for i in range(num_steps + 1):
        angle = (i / num_steps) * 2 * math.pi * 1.2
        z = i * step_height
        pt = [radius * math.cos(angle), radius * math.sin(angle), z + 1.0]
        railing_points.append(pt)
    
    railing = rs.AddCurve(railing_points)
    
    return steps + [central_column, railing]

# Execute the generation
result = create_staircase()
print("Spiral staircase generation complete!")`;
    } 
    else if (prompt.toLowerCase().includes('facade') || prompt.toLowerCase().includes('panel')) {
      return `import rhinoscriptsyntax as rs
import math

# Creating parametric facade
def create_facade():
    # Facade parameters
    width = 20
    height = 15
    panel_count_x = 20
    panel_count_y = 15
    
    panels = []
    
    # Create base surface
    base_surface = rs.AddPlaneSurface(rs.WorldXYPlane(), width, height)
    
    # Generate panels
    for i in range(panel_count_x):
        for j in range(panel_count_y):
            # Calculate panel position
            x = (i / panel_count_x) * width - width/2
            y = (j / panel_count_y) * height - height/2
            
            # Calculate distance from center for size variation
            distance = math.sqrt(x**2 + y**2)
            max_distance = math.sqrt((width/2)**2 + (height/2)**2)
            size_factor = 0.5 + 0.5 * (distance / max_distance)
            
            # Create hexagonal panel
            panel_size = 0.4 * size_factor
            panel = create_hexagon([x, y, 0], panel_size)
            
            # Extrude panel
            extrusion_depth = 0.2 * (1 - size_factor)
            panel = rs.ExtrudeCurveStraight(panel, [0, 0, 0], [0, 0, extrusion_depth])
            
            panels.append(panel)
    
    return panels

def create_hexagon(center, size):
    points = []
    for i in range(6):
        angle = i * math.pi / 3
        x = center[0] + size * math.cos(angle)
        y = center[1] + size * math.sin(angle)
        z = center[2]
        points.append([x, y, z])
    
    # Close the polygon
    points.append(points[0])
    
    # Create the hexagon
    hexagon = rs.AddPolyline(points)
    return hexagon

# Execute the generation
result = create_facade()
print("Parametric facade generation complete!")`;
    }
    else {
      // Generic code for other architectural descriptions
      return `import rhinoscriptsyntax as rs
import math
import random

def generate_architecture():
    # Parameters extracted from input
    description = """${prompt}"""
    
    # Parse key elements from description
    elements = analyze_text(description)
    
    # Generate base geometry
    base = create_base_geometry(elements)
    
    # Apply architectural features
    features = apply_architectural_features(base, elements)
    
    # Optimize for structural integrity
    optimized = optimize_structure(features)
    
    return optimized

def analyze_text(text):
    # AI text analysis would happen here
    print("Analyzing: " + text)
    return {
        "type": "building",
        "style": "modern",
        "features": ["parametric", "sustainable"]
    }

def create_base_geometry(elements):
    # Create base geometry based on elements
    width = 20
    length = 30
    height = 15
    
    # Create main building volume
    base_point = rs.WorldXYPlane().Origin
    x_axis = rs.WorldXYPlane().XAxis
    y_axis = rs.WorldXYPlane().YAxis
    z_axis = rs.WorldXYPlane().ZAxis
    
    building_box = rs.AddBox(rs.PlaneFromFrame(base_point, x_axis, y_axis, z_axis), width, length, height)
    
    # Add architectural elements
    roof = create_roof(width, length, height)
    windows = create_windows(width, length, height)
    entrance = create_entrance(width, length)
    
    return [building_box, roof, windows, entrance]

def create_roof(width, length, height):
    # Create a parametric roof
    roof_height = height * 0.2
    roof_points = []
    
    # Create roof surface
    for i in range(5):
        for j in range(5):
            x = (i / 4) * width - width/2
            y = (j / 4) * length - length/2
            z = height
            
            # Add some parametric variation
            z_offset = math.sin(x * 0.5) * math.cos(y * 0.5) * roof_height
            roof_points.append([x, y, z + z_offset])
    
    # Create roof surface from points
    roof = rs.AddSrfControlPtGrid(5, 5, roof_points)
    return roof

def create_windows(width, length, height):
    # Create windows on facades
    windows = []
    
    # Front facade windows
    for i in range(3):
        for j in range(5):
            x = (i + 1) * width/4 - width/2
            y = -length/2
            z = (j + 1) * height/6
            
            window = rs.AddRectangle(rs.PlaneFromNormal([x, y, z], [0, -1, 0]), 2, 1.5)
            window = rs.ExtrudeCurveStraight(window, [0, 0, 0], [0, -0.3, 0])
            windows.append(window)
    
    # Side facade windows
    for i in range(3):
        for j in range(5):
            x = width/2
            y = (i + 1) * length/4 - length/2
            z = (j + 1) * height/6
            
            window = rs.AddRectangle(rs.PlaneFromNormal([x, y, z], [1, 0, 0]), 2, 1.5)
            window = rs.ExtrudeCurveStraight(window, [0, 0, 0], [0.3, 0, 0])
            windows.append(window)
    
    return windows

def create_entrance(width, length):
    # Create main entrance
    entrance_width = 4
    entrance_height = 3
    
    entrance = rs.AddRectangle(rs.PlaneFromNormal([0, -length/2, 0], [0, -1, 0]), entrance_width, entrance_height)
    entrance = rs.ExtrudeCurveStraight(entrance, [0, 0, 0], [0, -0.5, 0])
    
    return entrance

def apply_architectural_features(base, elements):
    # Apply features based on elements
    print("Applying architectural features...")
    # Code would modify geometry based on features
    return base

def optimize_structure(geometry):
    # Ensure structural integrity
    print("Optimizing structure...")
    # Code would analyze and optimize for structural integrity
    return geometry

# Execute the generation
result = generate_architecture()
print("Architecture generation complete!")`;
    }
  }
}
