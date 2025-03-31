// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add theme toggle button to the header
  const header = document.querySelector('header');
  if (header) {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.innerHTML = '🌙';
    toggleButton.className = 'fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800 text-white';
    toggleButton.style.fontSize = '1.2rem';
    document.body.appendChild(toggleButton);
    
    // Add event listener to toggle button
    toggleButton.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        toggleButton.innerHTML = '☀️';
        localStorage.setItem('theme', 'light');
      } else {
        toggleButton.innerHTML = '🌙';
        localStorage.setItem('theme', 'dark');
      }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      toggleButton.innerHTML = '☀️';
    }
  }
});

// Interactive project showcase
document.addEventListener('DOMContentLoaded', function() {
  const projects = document.querySelectorAll('.project-card');
  
  if (projects.length > 0) {
    projects.forEach(project => {
      project.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
      });
      
      project.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
      
      project.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project-id');
        if (projectId) {
          showProjectDetails(projectId);
        }
      });
    });
  }
  
  // Add project details modal
  const modal = document.createElement('div');
  modal.id = 'project-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden';
  modal.innerHTML = `
    <div class="bg-gray-900 p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 id="modal-title" class="text-2xl font-bold text-white"></h2>
        <button id="close-modal" class="text-white text-2xl">&times;</button>
      </div>
      <div id="modal-content"></div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Close modal functionality
  document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('project-modal').classList.add('hidden');
  });
});

// Function to show project details
function showProjectDetails(projectId) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  
  // Project data (simulated)
  const projects = {
    '1': {
      title: 'Modern Skyscraper',
      description: 'A parametric skyscraper design generated from text description using MAIVI\'s AI-powered architecture software.',
      details: `
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Text Input</h3>
          <div class="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm">
            "Create a 50-story skyscraper with a twisting form that rotates 1.5 degrees per floor. Include a tapered profile that is 20% narrower at the top than the base. Add a curtain wall facade with alternating glass panels."
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Generated Python Code</h3>
          <div class="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm overflow-x-auto">
            <pre>import rhinoscriptsyntax as rs
import math

def create_skyscraper():
    # Parameters
    num_floors = 50
    rotation_per_floor = 1.5  # degrees
    base_width = 30
    base_depth = 30
    taper_ratio = 0.8  # top is 80% of base size
    
    floor_height = 4
    total_height = num_floors * floor_height
    
    floors = []
    
    for i in range(num_floors):
        # Calculate floor dimensions with taper
        height_ratio = i / num_floors
        current_width = base_width * (1 - (1 - taper_ratio) * height_ratio)
        current_depth = base_depth * (1 - (1 - taper_ratio) * height_ratio)
        
        # Create floor rectangle
        z = i * floor_height
        rotation = i * rotation_per_floor
        
        # Create rectangle points
        rect = rs.AddRectangle([0, 0, z], current_width, current_depth)
        
        # Rotate rectangle
        centroid = [0, 0, z]
        rs.RotateObject(rect, centroid, rotation, None, True)
        
        # Add to floors collection
        floors.append(rect)
    
    # Create curtain wall panels
    create_facade(floors)
    
    return floors

def create_facade(floors):
    # Facade panel creation logic here
    pass

# Execute in Rhino
skyscraper = create_skyscraper()</pre>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Resulting 3D Model</h3>
          <div class="bg-gray-800 p-3 rounded flex justify-center">
            <div class="w-full h-64 bg-gray-700 flex items-center justify-center">
              <p class="text-gray-400">[3D Model Visualization]</p>
            </div>
          </div>
        </div>
      `
    },
    '2': {
      title: 'Organic Pavilion',
      description: 'A nature-inspired pavilion with flowing forms generated from text description using MAIVI\'s AI-powered architecture software.',
      details: `
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Text Input</h3>
          <div class="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm">
            "Design an organic pavilion inspired by flower petals. Create 5 overlapping curved surfaces that emerge from a central point and extend outward and upward. Each petal should have a different height between 4 and 7 meters."
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Generated Python Code</h3>
          <div class="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm overflow-x-auto">
            <pre>import rhinoscriptsyntax as rs
import random
import math

def create_pavilion():
    # Parameters
    num_petals = 5
    min_height = 4
    max_height = 7
    base_radius = 10
    
    petals = []
    
    for i in range(num_petals):
        # Random height for this petal
        height = random.uniform(min_height, max_height)
        
        # Angle for this petal
        angle = (i / num_petals) * 2 * math.pi
        
        # Create control points for the surface
        pts = []
        
        # Center point
        pts.append([0, 0, 0])
        
        # Edge points
        edge_x = math.cos(angle) * base_radius
        edge_y = math.sin(angle) * base_radius
        pts.append([edge_x, edge_y, 0])
        
        # Control points for curvature
        ctrl_x1 = math.cos(angle - 0.2) * base_radius * 0.8
        ctrl_y1 = math.sin(angle - 0.2) * base_radius * 0.8
        pts.append([ctrl_x1, ctrl_y1, height * 0.6])
        
        ctrl_x2 = math.cos(angle + 0.2) * base_radius * 0.8
        ctrl_y2 = math.sin(angle + 0.2) * base_radius * 0.8
        pts.append([ctrl_x2, ctrl_y2, height * 0.6])
        
        # Top point
        top_x = math.cos(angle) * base_radius * 0.7
        top_y = math.sin(angle) * base_radius * 0.7
        pts.append([top_x, top_y, height])
        
        # Create the surface
        petal_surface = rs.AddSrfPt(pts)
        petals.append(petal_surface)
    
    return petals

# Execute in Rhino
pavilion = create_pavilion()</pre>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Resulting 3D Model</h3>
          <div class="bg-gray-800 p-3 rounded flex justify-center">
            <div class="w-full h-64 bg-gray-700 flex items-center justify-center">
              <p class="text-gray-400">[3D Model Visualization]</p>
            </div>
          </div>
        </div>
      `
    },
    '3': {
      title: 'Parametric Facade',
      description: 'A complex facade system with parametric panels generated from text description using MAIVI\'s AI-powered architecture software.',
      details: `
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Text Input</h3>
          <div class="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm">
            "Create a parametric facade system for a rectangular building. Use hexagonal panels that vary in size based on solar exposure. Panels should be smaller on the south face and gradually increase in size toward the north face."
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Generated Python Code</h3>
          <div class="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm overflow-x-auto">
            <pre>import rhinoscriptsyntax as rs
import math

def create_parametric_facade():
    # Building dimensions
    width = 30
    depth = 20
    height = 40
    
    # Panel parameters
    min_panel_size = 0.5
    max_panel_size = 1.5
    
    # Create building base
    base = rs.AddBox([-width/2, -depth/2, 0], [width/2, depth/2, height])
    
    # Extract faces
    faces = rs.ExplodePolysurfaces(base)
    
    # Identify faces by orientation
    south_face = None
    north_face = None
    east_face = None
    west_face = None
    
    for face in faces:
        centroid = rs.SurfaceAreaCentroid(face)[0]
        if abs(centroid[1] - depth/2) < 0.1:
            south_face = face
        elif abs(centroid[1] + depth/2) < 0.1:
            north_face = face
        elif abs(centroid[0] - width/2) < 0.1:
            east_face = face
        elif abs(centroid[0] + width/2) < 0.1:
            west_face = face
    
    # Apply panels to each face
    apply_hexagonal_panels(south_face, min_panel_size)
    apply_hexagonal_panels(north_face, max_panel_size)
    
    # For east and west, use gradient of sizes
    apply_hexagonal_panels_gradient(east_face, min_panel_size, max_panel_size, 'y')
    apply_hexagonal_panels_gradient(west_face, min_panel_size, max_panel_size, 'y')
    
    return faces

def apply_hexagonal_panels(surface, size):
    # Divide surface into UV grid
    u_count = int(rs.SurfaceDomain(surface, 0)[1] / size)
    v_count = int(rs.SurfaceDomain(surface, 1)[1] / size)
    
    panels = []
    
    for i in range(u_count):
        for j in range(v_count):
            # Offset for hexagonal packing
            offset = 0 if j % 2 == 0 else size/2
            
            # Get point on surface
            u_param = i * size + offset
            v_param = j * size * 0.866  # hexagon height factor
            
            if u_param <= rs.SurfaceDomain(surface, 0)[1] and v_param <= rs.SurfaceDomain(surface, 1)[1]:
                point = rs.EvaluateSurface(surface, u_param, v_param)
                
                # Create hexagon
                hexagon = create_hexagon(point, size)
                panels.append(hexagon)
    
    return panels

def apply_hexagonal_panels_gradient(surface, min_size, max_size, direction):
    # Implementation for gradient sizing
    pass

def create_hexagon(center, size):
    # Create hexagon geometry
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

# Execute in Rhino
facade = create_parametric_facade()</pre>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-2 text-blue-400">Resulting 3D Model</h3>
          <div class="bg-gray-800 p-3 rounded flex justify-center">
            <div class="w-full h-64 bg-gray-700 flex items-center justify-center">
              <p class="text-gray-400">[3D Model Visualization]</p>
            </div>
          </div>
        </div>
      `
    }
  };
  
  if (projects[projectId]) {
    const project = projects[projectId];
    modalTitle.textContent = project.title;
    modalContent.innerHTML = project.details;
    modal.classList.remove('hidden');
  }
}

// Add animation to workflow section
document.addEventListener('DOMContentLoaded', function() {
  const workflowSteps = document.querySelectorAll('.workflow-step');
  
  if (workflowSteps.length > 0) {
    let currentStep = 0;
    
    // Add active class to first step
    workflowSteps[0].classList.add('active');
    
    // Function to cycle through steps
    function cycleWorkflowSteps() {
      // Remove active class from current step
      workflowSteps[currentStep].classList.remove('active');
      
      // Move to next step or back to first
      currentStep = (currentStep + 1) % workflowSteps.length;
      
      // Add active class to new current step
      workflowSteps[currentStep].classList.add('active');
    }
    
    // Set interval to cycle through steps
    setInterval(cycleWorkflowSteps, 3000);
  }
});

// Add typing animation to simulate AI text input
document.addEventListener('DOMContentLoaded', function() {
  const demoInput = document.getElementById('demo-input');
  const demoOutput = document.getElementById('demo-output');
  
  if (demoInput && demoOutput) {
    const demoButton = document.createElement('button');
    demoButton.textContent = 'Generate Code';
    demoButton.className = 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2';
    demoInput.parentNode.insertBefore(demoButton, demoInput.nextSibling);
    
    demoButton.addEventListener('click', function() {
      const inputText = demoInput.value;
      if (inputText.trim() !== '') {
        // Show loading indicator
        demoOutput.innerHTML = '<div class="flex items-center"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Generating code...</div>';
        
        // Simulate processing time
        setTimeout(function() {
          // Generate fake Python code based on input
          const generatedCode = generateFakeCode(inputText);
          
          // Display with typing effect
          let i = 0;
          demoOutput.innerHTML = '<pre class="text-green-400"></pre>';
          const outputPre = demoOutput.querySelector('pre');
          
          function typeCode() {
            if (i < generatedCode.length) {
              outputPre.textContent += generatedCode.charAt(i);
              i++;
              setTimeout(typeCode, 10);
            }
          }
          
          typeCode();
        }, 1500);
      }
    });
  }
});

// Function to generate fake Python code based on input
function generateFakeCode(input) {
  // Simple template for demonstration
  return `import rhinoscriptsyntax as rs
import math

def generate_architecture():
    # Parameters extracted from input
    description = """${input}"""
    
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

def create_base_geometry(elements):
    # Create base geometry based on elements
    print("Creating base geometry...")
    # Code would generate appropriate Rhino geometry here
    return "base_geometry"

def apply_architectural_features(base, elements):
    # Apply features based on elements
    print("Applying architectural features...")
    # Code would modify geometry based on features
    return "featured_geometry"

def optimize_structure(geometry):
    # Ensure structural integrity
    print("Optimizing structure...")
    # Code would analyze and optimize for structural integrity
    return "optimized_geometry"

# Execute the generation
result = generate_architecture()
print("Architecture generation complete!")`
}
