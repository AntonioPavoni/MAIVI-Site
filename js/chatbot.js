// Enhanced chatbot interface for code demo
document.addEventListener('DOMContentLoaded', function() {
  // Find the demo section on the features page
  const demoSection = document.getElementById('demo');
  
  if (demoSection) {
    // Replace the existing demo content with our chatbot interface
    const demoContent = `
      <h2 class="text-3xl font-semibold mb-6 text-blue-600">Try It Yourself</h2>
      <p class="mb-6">Experience how MAIVI converts your architectural descriptions into code:</p>
      
      <div class="chat-container">
        <div class="chat-header">
          <h3>MAIVI AI Assistant</h3>
          <span>Online</span>
        </div>
        <div class="chat-body" id="chat-body">
          <div class="bot-message">
            Hello! I'm MAIVI's AI assistant. Describe an architectural element or structure, and I'll generate Python code for Rhino/Grasshopper to create it.
          </div>
        </div>
        <div class="chat-input">
          <input type="text" id="user-input" placeholder="Describe an architectural element..." />
          <button id="send-button">Send</button>
        </div>
      </div>
    `;
    
    // Replace the demo section content
    demoSection.innerHTML = demoContent;
    
    // Add link to our custom CSS
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
  
  // Sample architectural descriptions for demo
  const samplePrompts = [
    "Create a spiral staircase with 20 steps that winds around a central column with a radius of 1.5 meters",
    "Design a parametric facade with hexagonal panels that vary in size based on their distance from the center",
    "Generate a curved roof structure supported by three arched beams with a maximum height of 8 meters",
    "Create a modular housing system with stackable cubic units of 3x3 meters with connecting corridors"
  ];
  
  // Set a random placeholder
  userInput.placeholder = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
  
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
    
    // Simple keyword-based code generation for demo purposes
    let baseCode = `import rhinoscriptsyntax as rs
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
        "features": ["curved", "parametric", "sustainable"]
    }
`;

    // Add specific code based on keywords in the prompt
    if (prompt.toLowerCase().includes('stair') || prompt.toLowerCase().includes('step')) {
      baseCode += `
# Creating spiral staircase
def create_base_geometry(elements):
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
    
    return steps + [central_column, railing]`;
    } 
    else if (prompt.toLowerCase().includes('facade') || prompt.toLowerCase().includes('panel')) {
      baseCode += `
# Creating parametric facade
def create_base_geometry(elements):
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
    return hexagon`;
    }
    else if (prompt.toLowerCase().includes('roof') || prompt.toLowerCase().includes('beam')) {
      baseCode += `
# Creating curved roof structure
def create_base_geometry(elements):
    # Roof parameters
    width = 15
    length = 20
    max_height = 8
    num_beams = 3
    
    roof_elements = []
    
    # Create arched beams
    beam_spacing = length / (num_beams + 1)
    for i in range(num_beams):
        y_pos = beam_spacing * (i + 1) - length/2
        
        # Create arch control points
        control_points = []
        for j in range(9):
            x = (j / 8) * width - width/2
            
            # Parabolic arch formula
            height_factor = 1 - (2 * x / width) ** 2
            z = max_height * height_factor
            
            control_points.append([x, y_pos, z])
        
        # Create beam curve
        beam_curve = rs.AddInterpCurve(control_points)
        
        # Create beam geometry (pipe)
        beam = rs.AddPipe(beam_curve, 0, 0.3)
        roof_elements.append(beam)
    
    # Create roof surface
    surface_points = []
    for y in range(num_beams):
        y_pos = beam_spacing * (y + 1) - length/2
        row_points = []
        
        for x in range(9):
            x_pos = (x / 8) * width - width/2
            height_factor = 1 - (2 * x_pos / width) ** 2
            z = max_height * height_factor
            
            row_points.append([x_pos, y_pos, z])
        
        surface_points.append(row_points)
    
    # Create roof surface
    roof_surface = rs.AddLoftSrf([rs.AddInterpCurve(row) for row in surface_points])
    roof_elements.append(roof_surface)
    
    return roof_elements`;
    }
    else if (prompt.toLowerCase().includes('modular') || prompt.toLowerCase().includes('housing')) {
      baseCode += `
# Creating modular housing system
def create_base_geometry(elements):
    # Module parameters
    module_size = 3
    grid_size = 4
    module_height = 3
    
    modules = []
    
    # Create base grid of modules
    for i in range(grid_size):
        for j in range(grid_size):
            # Skip some modules randomly for variation
            if random.random() < 0.3:
                continue
                
            # Determine module position
            x = i * module_size - (grid_size * module_size) / 2
            y = j * module_size - (grid_size * module_size) / 2
            
            # Determine stack height (1-3 modules)
            stack_height = random.randint(1, 3)
            
            for k in range(stack_height):
                z = k * module_height
                
                # Create module box
                module = rs.AddBox(rs.WorldXYPlane(), module_size, module_size, module_height)
                module = rs.MoveObject(module, [x, y, z])
                
                # Add to modules list
                modules.append(module)
                
                # Add windows randomly
                if random.random() < 0.7:
                    window = create_window([x, y, z], module_size, module_height)
                    modules.append(window)
    
    # Create connecting corridors
    corridors = create_corridors(modules, module_size, module_height)
    
    return modules + corridors

def create_window(position, size, height):
    # Create window on random face of module
    face = random.randint(0, 3)
    window_width = size * 0.6
    window_height = height * 0.6
    
    if face == 0:
        window_plane = rs.MovePlane(rs.WorldYZPlane(), [position[0], position[1] + size/2, position[2] + height/2])
    elif face == 1:
        window_plane = rs.MovePlane(rs.WorldYZPlane(), [position[0] + size, position[1] + size/2, position[2] + height/2])
    elif face == 2:
        window_plane = rs.MovePlane(rs.WorldXZPlane(), [position[0] + size/2, position[1], position[2] + height/2])
    else:
        window_plane = rs.MovePlane(rs.WorldXZPlane(), [position[0] + size/2, position[1] + size, position[2] + height/2])
    
    window = rs.AddRectangle(window_plane, window_width, window_height)
    return window

def create_corridors(modules, module_size, module_height):
    # Implementation for connecting corridors
    corridors = []
    # (Simplified for this example)
    return corridors`;
    }
    
    // Add common ending functions
    baseCode += `
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

    return baseCode;
  }
}
