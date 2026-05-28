/* All lesson and challenge content. Loaded before app.js. */
const DATA = {
  levels: [
    {
      id: "beginner",
      title: "Beginner",
      subtitle: "Getting Started with FreeCAD",
      color: "#22c55e",
      lessons: [
        {
          id: "b1", levelId: "beginner", num: 1,
          duration: "~20 min",
          title: "What is FreeCAD & Installation",
          description: "Learn what FreeCAD is, where it fits in the CAD landscape, and how to install version 1.1+ on your operating system.",
          objectives: [
            "Understand what parametric, history-based CAD means",
            "Learn why FreeCAD is a powerful open-source alternative",
            "Install FreeCAD 1.1+ on Windows, macOS, or Linux",
            "Launch FreeCAD and identify the Start workbench"
          ],
          resources: [
            { label: "FreeCAD Official Website", url: "https://www.freecad.org/" },
            { label: "About FreeCAD — Wiki", url: "https://wiki.freecad.org/About_FreeCAD" },
            { label: "Installing on Windows — Wiki", url: "https://wiki.freecad.org/Installing_on_Windows" },
            { label: "Installing on Linux — Wiki", url: "https://wiki.freecad.org/Installing_on_Linux" },
            { label: "FreeCAD 1.0 Release Notes — Wiki", url: "https://wiki.freecad.org/Release_notes_1.0" }
          ],
          exercises: [
            "Download and install FreeCAD 1.1+ from freecad.org/downloads",
            "Open FreeCAD and take note of the default Start workbench layout",
            "Click the workbench dropdown in the toolbar and browse through the list of available workbenches",
            "Switch to the Part Design workbench — notice how the toolbar and menus change",
            "Create a new empty document: File → New"
          ]
        },
        {
          id: "b2", levelId: "beginner", num: 2,
          duration: "~25 min",
          title: "The FreeCAD Interface",
          description: "Master the FreeCAD UI: the Model tree (Combo View), 3D viewport, Task panel, status bar, and the workbench system.",
          objectives: [
            "Identify each panel in the 3-panel default layout",
            "Understand the difference between the Model tab and Tasks tab in the Combo View",
            "Switch between workbenches and understand what changes",
            "Read the status bar for context-sensitive hints",
            "Customize basic UI preferences"
          ],
          resources: [
            { label: "Interface Overview — Wiki", url: "https://wiki.freecad.org/Interface" },
            { label: "Workbenches — Wiki", url: "https://wiki.freecad.org/Workbenches" },
            { label: "Combo View — Wiki", url: "https://wiki.freecad.org/Combo_view" },
            { label: "3D View — Wiki", url: "https://wiki.freecad.org/3D_view" }
          ],
          exercises: [
            "Identify the Combo View (left panel), 3D View (center), and Property View (lower left)",
            "Open a new document, switch to Part Design workbench, then back to Part workbench — observe toolbar changes",
            "Right-click the toolbar area to toggle different toolbars on/off",
            "Open Preferences (Edit → Preferences) and explore the General and Display sections",
            "Reset the interface to default: View → Standard Views → Home"
          ]
        },
        {
          id: "b3", levelId: "beginner", num: 3,
          duration: "~20 min",
          title: "Navigating the 3D View",
          description: "Learn mouse navigation, the Navigation Cube, standard views, and keyboard shortcuts for moving around your 3D model.",
          objectives: [
            "Rotate, pan, and zoom using the mouse",
            "Use numpad keys 1–9 for standard orthographic views",
            "Use the Navigation Cube to orient the view",
            "Change the navigation style to suit your preference (CAD, Blender, etc.)",
            "Fit the view to selected objects"
          ],
          resources: [
            { label: "Mouse Navigation — Wiki", url: "https://wiki.freecad.org/Mouse_navigation" },
            { label: "Navigation Cube — Wiki", url: "https://wiki.freecad.org/Navigation_Cube" },
            { label: "Standard Views — Wiki", url: "https://wiki.freecad.org/Std_View_Menu" }
          ],
          exercises: [
            "Create a simple Part Box (Part workbench → Part menu → Box) as a navigation target",
            "Practice: middle-mouse-button rotate, middle-mouse pan, scroll to zoom",
            "Press numpad 1, 3, 7 to switch between Front, Right, and Top views",
            "Press numpad 0 for perspective view, V then O for orthographic",
            "Change navigation style: Edit → Preferences → Display → Navigation → Navigation style → try 'Blender', then switch back to 'CAD'",
            "Press V then F (or numpad .) to fit the selected object to the viewport"
          ]
        },
        {
          id: "b4", levelId: "beginner", num: 4,
          duration: "~35 min",
          title: "Part Design Basics & Your First Sketch",
          description: "Create a Body in Part Design, enter the Sketcher workbench, and draw a fully constrained sketch using lines, arcs, and dimensional constraints.",
          objectives: [
            "Create a new Body in Part Design — the container for all features",
            "Attach a Sketch to a reference plane (XY, XZ, YZ)",
            "Draw a closed profile using the Line and Arc tools",
            "Apply geometric constraints (Horizontal, Vertical, Coincident, Equal)",
            "Apply dimensional constraints (Fix Distance, Fix Radius)",
            "Understand 'fully constrained' (green) vs. under-constrained (white/yellow)"
          ],
          resources: [
            { label: "Part Design Workbench — Wiki", url: "https://wiki.freecad.org/PartDesign_Workbench" },
            { label: "Sketcher Workbench — Wiki", url: "https://wiki.freecad.org/Sketcher_Workbench" },
            { label: "PartDesign Body — Wiki", url: "https://wiki.freecad.org/PartDesign_Body" },
            { label: "Basic Sketcher Tutorial — Wiki", url: "https://wiki.freecad.org/Basic_Sketcher_Tutorial" }
          ],
          exercises: [
            "Switch to Part Design workbench; create a new Body via Part Design → Body",
            "Click 'Create Sketch' and select the XY_Plane",
            "Draw a rectangle using Sketcher → Rectangle (or the R shortcut) — any size",
            "Apply Sketch → Constrain horizontal distance: set width to 80 mm",
            "Apply Sketch → Constrain vertical distance: set height to 50 mm",
            "Apply Sketch → Fix point to fix the bottom-left corner to the origin (x=0, y=0)",
            "Verify all lines turn green (fully constrained), then close the Sketcher"
          ,
            "Repair the broken sketch: a Vertical constraint was applied to a line that already has both endpoints fixed by Coincident constraints. Open the Solver Messages panel, identify the redundant constraint, delete it, and confirm the sketch turns fully green (0 degrees of freedom)."
          ]
        },
        {
          id: "b5", levelId: "beginner", num: 5,
          duration: "~30 min",
          title: "First 3D Feature — Pad and Pocket",
          description: "Convert your sketch into a 3D solid using Pad, then cut into it with a Pocket. These two operations are the core of Part Design modelling.",
          objectives: [
            "Pad a sketch to a specified depth to create a solid",
            "Use Symmetric padding to center the extrusion",
            "Create a second sketch on an existing face",
            "Apply a Pocket (cut) through part of the solid",
            "Examine and understand the Feature Tree"
          ],
          resources: [
            { label: "PartDesign Pad — Wiki", url: "https://wiki.freecad.org/PartDesign_Pad" },
            { label: "PartDesign Pocket — Wiki", url: "https://wiki.freecad.org/PartDesign_Pocket" },
            { label: "Basic Part Design Tutorial — Wiki", url: "https://wiki.freecad.org/Basic_Part_Design_Tutorial_019" }
          ],
          exercises: [
            "Select the 80×50mm sketch in the Model tree and click Part Design → Pad",
            "Set the depth to 20 mm and click OK — you should see a rectangular block",
            "Click on the top face of the block to select it",
            "Create a new Sketch on this face; draw a circle with diameter 30 mm centered on the face",
            "Close the Sketcher, select the circle sketch, and click Part Design → Pocket",
            "Set depth to 10 mm; experiment with changing it to 'Through All'",
            "In the Model tree, right-click features to rename them (e.g. 'BasePad', 'HolePocket')"
          ]
        }
      ],
      challenges: [
        {
          id: "bc1",
          type: "Mini Challenge",
          title: "Sketch Accuracy Challenge",
          description: "Draw an L-shaped profile with exact dimensions and make it fully constrained. This challenge tests your ability to apply constraints systematically.",
          requirements: [
            "L-shape outer dimensions: 100 mm wide × 60 mm tall",
            "Inner cutout (the 'notch'): 60 mm wide × 30 mm tall, in the top-right corner",
            "All 6 lines of the L-shape drawn and connected",
            "All required dimensional constraints applied",
            "Sketch is fully constrained — all lines turn green",
            "Sketch can be closed and re-opened without errors or yellow warnings"
          ],
          hints: [
            "Use the 'Fix Point' constraint on the origin to anchor the sketch",
            "Draw all 6 lines first, then apply constraints — don't mix drawing and constraining",
            "Count your degrees of freedom: 6 lines × 2 endpoints = many DOF, but each shared endpoint and constraint removes DOF",
            "The Sketcher status bar shows remaining DOF — aim for 0"
          ],
          resources: [
            { label: "Sketcher Constraints — Wiki", url: "https://wiki.freecad.org/Sketcher_Workbench#Sketcher_constraints" }
          ]
        },
        {
          id: "bc2",
          type: "Capstone Challenge",
          title: "Model a Simple Wall-Mount Bracket",
          description: "Model a wall-mount bracket from the specification below. This is your first complete, multi-feature Part Design model.",
          requirements: [
            "Base plate: 80 mm × 60 mm × 8 mm, padded from XY plane",
            "Vertical flange: 60 mm wide × 50 mm tall × 8 mm thick, padded from the back face of the base plate",
            "Four mounting holes: Ø6 mm through-holes, one at each corner of the base plate (10 mm from each edge)",
            "Inside corner fillet: R3 mm applied to the inner edge where base meets flange",
            "File saved as bracket.FCStd",
            "Model has no errors in the Feature Tree (no yellow warning icons)"
          ],
          hints: [
            "Model the base plate first, then the vertical flange as a second Pad on the back face",
            "Use a construction geometry rectangle for the hole centerlines to ensure symmetric placement",
            "The Fillet tool is in the Part Design menu under 'Dress-Up' features",
            "If the fillet fails, try a smaller radius first (R1mm) to confirm the edge is selected correctly"
          ],
          resources: [
            { label: "PartDesign Fillet — Wiki", url: "https://wiki.freecad.org/PartDesign_Fillet" },
            { label: "PartDesign Hole — Wiki", url: "https://wiki.freecad.org/PartDesign_Hole" }
          ]
        }
      ]
    },
    {
      id: "intermediate",
      title: "Intermediate",
      subtitle: "Expanding Your Toolkit",
      color: "#3b82f6",
      lessons: [
        {
          id: "i1", levelId: "intermediate", num: 6,
          duration: "~40 min",
          title: "Advanced Sketching Techniques",
          description: "Level up your Sketcher skills with symmetry constraints, construction geometry, external geometry references, and more efficient constraint workflows.",
          objectives: [
            "Use the Symmetry constraint to reduce constraint count by up to half",
            "Toggle lines to Construction mode (dashed) for reference geometry",
            "Use 'External Geometry' to reference edges from the 3D solid inside a sketch",
            "Apply Point-On-Object, Equal, and Tangent constraints",
            "Use sketch arrays and mirroring tools"
          ],
          resources: [
            { label: "Sketcher ToggleConstruction — Wiki", url: "https://wiki.freecad.org/Sketcher_ToggleConstruction" },
            { label: "Sketcher External — Wiki", url: "https://wiki.freecad.org/Sketcher_External" },
            { label: "Sketcher Symmetry — Wiki", url: "https://wiki.freecad.org/Sketcher_Symmetry" },
            { label: "All Sketcher Constraints — Wiki", url: "https://wiki.freecad.org/Sketcher_Workbench#Sketcher_constraints" }
          ],
          exercises: [
            "Open the bracket sketch from the beginner challenge; re-draw the hole pattern using a construction circle as a bolt-circle reference",
            "Apply a Symmetry constraint across the vertical center axis to constrain both sides with one constraint",
            "Use External Geometry to reference the outer edge of the solid inside a sketch on the top face",
            "Create a slot sketch (two semicircles + two lines) using only 4 constraints by exploiting Equal and Symmetric",
            "Use Sketcher → Tools → Create Carbon Copy to copy an existing sketch into a new one"
          ]
        },
        {
          id: "i2", levelId: "intermediate", num: 7,
          duration: "~45 min",
          title: "Revolution, Loft, and Sweep",
          description: "Create rotationally symmetric parts with Revolution, complex shape transitions with Loft, and profiles swept along a path with SubShapeBinder/Sweep.",
          objectives: [
            "Sketch a half-profile and revolve it 360° (and partial angles)",
            "Create a Loft between two sketches on parallel planes",
            "Sweep a profile along a 3D spine path",
            "Understand when to use each tool vs. Pad"
          ],
          resources: [
            { label: "PartDesign Revolution — Wiki", url: "https://wiki.freecad.org/PartDesign_Revolution" },
            { label: "PartDesign Additive Loft — Wiki", url: "https://wiki.freecad.org/PartDesign_AdditiveLoft" },
            { label: "PartDesign Additive Pipe (Sweep) — Wiki", url: "https://wiki.freecad.org/PartDesign_AdditivePipe" }
          ],
          exercises: [
            "Sketch a stepped profile on the YZ plane (a T-shape or stepped shaft profile) and revolve it 360° to create a turned part",
            "Create a new Body; add two parallel sketches separated by 40 mm (one circle Ø30 mm, one square 30×30 mm); Loft between them",
            "Model a pipe elbow: create a sketch for the pipe cross-section (circle) and a spine path (a 90° arc); use Additive Pipe",
            "Experiment with the Revolution 'Angle' parameter — try 180° and 270° revolutions"
          ]
        },
        {
          id: "i3", levelId: "intermediate", num: 8,
          duration: "~40 min",
          title: "Assembly Workbench (Built-in)",
          description: "Use FreeCAD 1.0+'s built-in Assembly workbench to combine multiple parts using joints. This replaces the need for third-party assembly addons.",
          objectives: [
            "Create a new Assembly document",
            "Insert and position component parts as links",
            "Apply Fixed, Revolute, Slider, and Ball joints",
            "Run the assembly solver and resolve constraint conflicts",
            "Understand the difference between 'Insert Link' and direct insertion"
          ],
          resources: [
            { label: "Assembly Workbench — Wiki", url: "https://wiki.freecad.org/Assembly_Workbench" },
            { label: "Assembly Joints — Wiki", url: "https://wiki.freecad.org/Assembly_Joints" },
            { label: "Release Notes 1.0 — Assembly", url: "https://wiki.freecad.org/Release_notes_1.0#Assembly" }
          ],
          exercises: [
            "Create two simple part files: a cylindrical pin (Ø5 mm × 20 mm) and a block with a Ø5.1 mm hole",
            "Create a new Assembly document; insert both parts as links",
            "Apply a Fixed joint to the block to anchor it",
            "Apply a Revolute joint between the pin's cylindrical face and the hole — verify the pin can rotate",
            "Add a third part and connect it with a Slider joint; verify the assembly solver runs without errors"
          ]
        },
        {
          id: "i4", levelId: "intermediate", num: 9,
          duration: "~45 min",
          title: "Technical Drawing with TechDraw",
          description: "Generate professional 2D engineering drawings from your 3D models using the TechDraw workbench — complete with views, dimensions, and annotations.",
          objectives: [
            "Create a drawing Page using a standard template (A4, A3)",
            "Insert Front, Top, and Side projected views",
            "Add a Section view with a custom cutting plane",
            "Add dimensions (linear, radial, angular) and annotations",
            "Export the drawing as PDF and SVG"
          ],
          resources: [
            { label: "TechDraw Workbench — Wiki", url: "https://wiki.freecad.org/TechDraw_Workbench" },
            { label: "Basic TechDraw Tutorial — Wiki", url: "https://wiki.freecad.org/Basic_TechDraw_Tutorial" },
            { label: "TechDraw Templates — Wiki", url: "https://wiki.freecad.org/TechDraw_Templates" }
          ],
          exercises: [
            "Open the bracket model; switch to TechDraw workbench",
            "Insert a new Page with an A4 template: TechDraw → New Default",
            "Insert an orthographic view group (Front + Top + Right) at scale 1:1",
            "Add a Section view through the center of the bracket showing the pocket depth",
            "Dimension: overall width, height, hole diameter (Ø6), and pocket depth",
            "Add a title block annotation with your name and date",
            "Export as PDF: File → Export → PDF"
          ]
        },
        {
          id: "i5", levelId: "intermediate", num: 10,
          duration: "~35 min",
          title: "Spreadsheet-Driven Parametric Models",
          description: "Drive all model dimensions from a Spreadsheet so that changing a single cell updates the entire geometry — the foundation of proper parametric design.",
          objectives: [
            "Insert a Spreadsheet into a Part Design document",
            "Name cells with aliases (e.g. 'width', 'height')",
            "Reference cell aliases in Sketcher dimension fields using expressions",
            "Understand the FreeCAD expression engine syntax",
            "Test the parametric model by changing values and watching it update",
        {
          id: "i6", levelId: "intermediate", num: 11,
          duration: "~40 min",
          title: "The Topology Naming Problem",
          description: "Understand why references to faces and edges break when models change, how FreeCAD 1.0 mitigated this with TNP-stable references, and design strategies to avoid the problem entirely.",
          objectives: [
            "Explain why topological IDs change when features are reordered or modified",
            "Understand FreeCAD 1.0's TNP mitigation (opaque persistent naming)",
            "Use Datum planes and lines as stable sketch attachment points",
            "Recognise 'Sketch is missing a feature' errors and diagnose their cause",
            "Redesign a sketch to attach to a Datum rather than a face edge"
          ],
          resources: [
            { label: "Topological Naming Problem — Wiki", url: "https://wiki.freecad.org/Topological_naming_problem" },
            { label: "Release Notes 1.0 — TNP section", url: "https://wiki.freecad.org/Release_notes_1.0#Topological_Naming_Problem_Mitigation" },
            { label: "PartDesign Datum Plane — Wiki", url: "https://wiki.freecad.org/PartDesign_Plane" }
          ],
          exercises: [
            "Build a stepped block with two Pads and a Pocket that references a face of the first Pad",
            "Reorder the features in the Model tree by drag-and-drop — observe which Sketches turn red",
            "Fix the broken references by attaching each Sketch to a Datum Plane instead of a face",
            "Reorder features again — confirm the model rebuilds cleanly with no red features",
            "Document in a text file: which three attachment modes are TNP-safe and why"
          ]
        },
        {
          id: "i7", levelId: "intermediate", num: 12,
          duration: "~45 min",
          title: "App::Link & Multi-Document Workflows",
          description: "Learn to use App::Link to reference parts from other documents without copying geometry, enabling large assemblies where each component lives in its own file.",
          objectives: [
            "Understand the difference between a Link and a Copy",
            "Create an App::Link from one document to another",
            "Understand how changes to the source document propagate to all links",
            "Build a multi-document project with a master assembly and separate part files",
            "Use the Link array to efficiently repeat a component many times"
          ],
          resources: [
            { label: "App Link — Wiki", url: "https://wiki.freecad.org/App_Link" },
            { label: "Assembly Workbench — Wiki", url: "https://wiki.freecad.org/Assembly_Workbench" },
            { label: "Multi-document linking — Forum", url: "https://forum.freecad.org/viewtopic.php?t=56499" }
          ],
          exercises: [
            "Create bolt.FCStd with a single M5 bolt model",
            "Create plate.FCStd with a flat plate and 4 bolt holes",
            "Create assembly.FCStd; insert bolt.FCStd as a Link 4 times and mate each to a hole",
            "Change the bolt head diameter in bolt.FCStd — verify all 4 links in assembly.FCStd update automatically",
            "Use a Link Array to place 12 instances of the bolt around a bolt circle driven by a spreadsheet"
          ]
        },
        {
          id: "i8", levelId: "intermediate", num: 13,
          duration: "~35 min",
          title: "Draft Workbench",
          description: "Use the Draft workbench for 2D drawing, DXF import and export, and to prepare 2D geometry that feeds into 3D Part Design features.",
          objectives: [
            "Switch to the Draft workbench and understand its snapping system",
            "Draw lines, polylines, and arcs using Draft tools",
            "Import a DXF file and convert Draft geometry to a Sketch",
            "Export a drawing as DXF",
            "Use Draft Scale and Draft Offset for 2D layout work"
          ],
          resources: [
            { label: "Draft Workbench — Wiki", url: "https://wiki.freecad.org/Draft_Workbench" },
            { label: "Draft DXF — Wiki", url: "https://wiki.freecad.org/Draft_DXF" },
            { label: "Draft to Sketch — Wiki", url: "https://wiki.freecad.org/Draft_Draft2Sketch" }
          ],
          exercises: [
            "Switch to Draft workbench; draw a simple floor plan outline using Draft Lines with snapping enabled",
            "Verify you can snap to grid, endpoints, and midpoints",
            "Export the floor plan as DXF: File → Export → DXF",
            "Import the DXF back into a new document and convert it using Draft → Draft to Sketch",
            "Extrude the resulting Sketch 2500 mm using Part Design Pad to create a simple room shell"
          ]
        },
        {
          id: "i9", levelId: "intermediate", num: 14,
          duration: "~35 min",
          title: "Mesh Workbench & 3D Print Prep",
          description: "Import, inspect, and repair STL/OBJ mesh files, fix common 3D-printing errors, and convert cleaned meshes back to solid geometry.",
          objectives: [
            "Import an STL file into the Mesh workbench",
            "Run mesh analysis: detect non-manifold edges, flipped normals, and holes",
            "Use Fill Holes and Harmonise Normals to repair common defects",
            "Convert a watertight mesh to a solid shape via Part workbench",
            "Export a Part Design solid as STL ready for slicing"
          ],
          resources: [
            { label: "Mesh Workbench — Wiki", url: "https://wiki.freecad.org/Mesh_Workbench" },
            { label: "Mesh to Part — Wiki", url: "https://wiki.freecad.org/Mesh_to_Part" },
            { label: "3D Printing with FreeCAD — Wiki", url: "https://wiki.freecad.org/Manual:Preparing_models_for_3D_printing" }
          ],
          exercises: [
            "Download any free STL model and import it into FreeCAD Mesh workbench",
            "Run Mesh → Analyse → Evaluate & Repair Mesh — note any errors reported",
            "Use Fill Holes and Harmonise Normals to make the mesh watertight",
            "Convert to solid: Part workbench → Part → Convert to Solid — check the result has volume > 0",
            "Export your bracket model from Part Design as STL: File → Export → STL"
          ]
        }
          ],
          resources: [
            { label: "Spreadsheet Workbench — Wiki", url: "https://wiki.freecad.org/Spreadsheet_Workbench" },
            { label: "Expressions — Wiki", url: "https://wiki.freecad.org/Expressions" },
            { label: "Spreadsheet Tutorial — Wiki", url: "https://wiki.freecad.org/Spreadsheet_tutorial" }
          ],
          exercises: [
            "Open the bracket model; add a Spreadsheet (Spreadsheet → New Spreadsheet)",
            "In the spreadsheet, create cells: A1=Width (label), B1=80; A2=Height, B2=60; A3=Thickness, B3=8; A4=HoleDiameter, B4=6",
            "Right-click each B cell → Properties → set Alias to 'width', 'height', 'thickness', 'hole_d'",
            "Edit the base pad sketch; click a dimension → in the input field type '=Spreadsheet.width'",
            "Do the same for all other parametric dimensions",
            "Test: change B1 from 80 to 120 — the entire model should update automatically"
          ,
            "Parametric robustness test: change box_length from 80 to 120 mm, then to 40 mm, then to 200 mm, recomputing after each change. Verify the model rebuilds cleanly each time with no red or yellow features in the tree. Fix any sketch constraints that cause breakage."
          ]
        }
      ],
      challenges: [
        {
          id: "ic1",
          type: "Mini Challenge",
          title: "Parametric Turned Part",
          description: "Model a cylindrical knob using Revolution, fully driven by a spreadsheet with 5 parameters. No hardcoded dimensions allowed.",
          requirements: [
            "Spreadsheet with 5 aliased cells: body_diameter, shaft_diameter, body_height, shaft_length, groove_depth",
            "Revolution sketch uses only expressions referencing the spreadsheet",
            "Changing body_diameter from 30 to 50 updates the model cleanly without errors",
            "No underconstrained sketch elements (no yellow lines)",
            "Groove/profile detail visible in the Revolution (at least 2 diameter steps)"
          ],
          hints: [
            "Sketch only the right half-profile for revolution (everything to the right of the Y axis)",
            "Use expressions like 'Spreadsheet.body_diameter / 2' in radius/diameter fields",
            "Add a Fixed constraint on the axis point at the origin to fully constrain the half-profile"
          ],
          resources: [
            { label: "Expressions Syntax — Wiki", url: "https://wiki.freecad.org/Expressions#Supported_syntax" }
          ]
        },
        {
          id: "ic2",
          type: "Capstone Challenge",
          title: "Parametric Snap-Fit Box with Lid",
          description: "Model a two-part snap-fit box driven by a shared spreadsheet. Both the box body and lid update when parameters change.",
          requirements: [
            "Shared spreadsheet with: box_length, box_width, box_height, wall_thickness, snap_depth",
            "Box body: hollow inside with wall_thickness walls, open top",
            "Lid: fits over the box top with a 1 mm inset lip using snap_depth to control the snap feature",
            "Both parts in the same .FCStd file referencing the same spreadsheet",
            "Assembly showing box + lid mated (lid sitting on box)",
            "TechDraw page with a section view showing the snap-fit detail",
            "Changing box_length updates both box and lid without errors"
          ],
          hints: [
            "Use PartDesign ShapeBinder to reference the box body geometry inside the lid sketch",
            "Model the hollow inside with a Pocket using 'Through All' with offset for the wall thickness",
            "The snap lip can be a small Pad on the inside perimeter of the lid"
          ],
          resources: [
            { label: "PartDesign ShapeBinder — Wiki", url: "https://wiki.freecad.org/PartDesign_ShapeBinder" },
            { label: "PartDesign SubShapeBinder — Wiki", url: "https://wiki.freecad.org/PartDesign_SubShapeBinder" }
          ]
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced",
      subtitle: "Power Tools & Analysis",
      color: "#a855f7",
      lessons: [
        {
          id: "a1", levelId: "advanced", num: 15,
          duration: "~45 min",
          title: "Part Workbench — Boolean Operations",
          description: "The Part workbench works with raw shapes (not Bodies). Learn Boolean union, cut, and intersection plus shape primitives — essential for complex geometry.",
          objectives: [
            "Distinguish Part workbench from Part Design — when to use each",
            "Create Part primitives: Box, Cylinder, Sphere, Cone, Torus",
            "Apply Boolean Fuse (union), Cut, and Common (intersection)",
            "Understand shape vs. solid topology",
            "Use Part Section and Part Slice"
          ],
          resources: [
            { label: "Part Workbench — Wiki", url: "https://wiki.freecad.org/Part_Workbench" },
            { label: "Part Boolean Operations — Wiki", url: "https://wiki.freecad.org/Part_Boolean" },
            { label: "Part Cut — Wiki", url: "https://wiki.freecad.org/Part_Cut" },
            { label: "Part Fuse — Wiki", url: "https://wiki.freecad.org/Part_Fuse" }
          ],
          exercises: [
            "Switch to Part workbench; create a Cylinder (Ø30 mm × 40 mm) and a Sphere (Ø35 mm) overlapping it",
            "Select both → Part → Boolean → Fuse → inspect the result in the Model tree",
            "Create a Box (40×40×40) and a smaller Cylinder (Ø20×50) passing through the center; Boolean Cut to hollow out the box",
            "Create two overlapping Boxes and use Part → Common (Intersection) — observe that only the overlapping volume remains",
            "Use Part → Section to slice a solid with a plane and export the resulting cross-section shape"
          ]
        },
        {
          id: "a2", levelId: "advanced", num: 16,
          duration: "~60 min",
          title: "FEM Basics — Finite Element Analysis",
          description: "Perform a basic static structural analysis using the FEM workbench. Understand meshing, boundary conditions, loads, and interpreting Von Mises stress results.",
          objectives: [
            "Activate the FEM workbench and create an Analysis container",
            "Assign a material (steel) to the solid",
            "Generate a mesh using Gmsh at a specified element size",
            "Apply Fixed Constraint (boundary condition) and Force Load",
            "Run the CalculiX solver",
            "Visualize and interpret Von Mises stress and displacement results"
          ],
          resources: [
            { label: "FEM Workbench — Wiki", url: "https://wiki.freecad.org/FEM_Workbench" },
            { label: "FEM Tutorial — Wiki", url: "https://wiki.freecad.org/FEM_tutorial" },
            { label: "FEM Mesh from Shape (Gmsh) — Wiki", url: "https://wiki.freecad.org/FEM_MeshGmshFromShape" },
            { label: "CalculiX Solver — Wiki", url: "https://wiki.freecad.org/FEM_SolverCalculixCxxtools" }
          ],
          exercises: [
            "Open the bracket model; switch to FEM workbench; create New Analysis",
            "Add material: FEM → Material → Solid → select CalculiX-Steel",
            "Create mesh: FEM → Mesh → FEM Mesh from Shape by Gmsh, set max element size to 3 mm",
            "Add Fixed Constraint to the two mounting hole faces (simulating bolted to wall)",
            "Add Force Load on the horizontal ledge: 500 N in the -Z direction",
            "Run solver: FEM → Solver CalculiX Standard → Run",
            "View results: double-click 'CCX_Results', enable Von Mises Stress, note the location of maximum stress"
          ,
            "Reproduce this drawing: using the dimensioned bracket from the Beginner Capstone, create a TechDraw page with Front, Top, and Right views plus one Section view through the pocket. Add dimensions for overall width, flange height, hole diameter, and pocket depth. Export as PDF."
          ]
        },
        {
          id: "a3", levelId: "advanced", num: 17,
          duration: "~55 min",
          title: "Path/CAM Workbench",
          description: "Generate CNC toolpaths from a 3D model using the CAM workbench. Go from 3D model to G-code ready for a CNC machine.",
          objectives: [
            "Create a CAM Job with stock material defined",
            "Add a Profile (contour) operation with a specified end mill",
            "Add a Pocket clearing operation",
            "Simulate the toolpath in the 3D view",
            "Post-process to G-code using a standard post-processor"
          ],
          resources: [
            { label: "CAM Workbench — Wiki", url: "https://wiki.freecad.org/CAM_Workbench" },
            { label: "CAM Walkthrough for the Impatient — Wiki", url: "https://wiki.freecad.org/CAM_Walkthrough_for_the_Impatient" },
            { label: "CAM Job — Wiki", url: "https://wiki.freecad.org/CAM_Job" },
            { label: "CAM Post Processor — Wiki", url: "https://wiki.freecad.org/CAM_Post" }
          ],
          exercises: [
            "Open a simple flat-bottom part; switch to CAM workbench",
            "Create a Job: CAM → Job → set stock to 5 mm above/around the part",
            "Add a Tool Controller: 6 mm flat end mill, 3 flutes, RPM 18000",
            "Add Profile operation: select the outer perimeter edge, depth to bottom of stock",
            "Add Pocket operation: select the pocket floor, configure step-over at 40%",
            "Run the path simulation: CAM → Path Simulator",
            "Post-process: CAM → Post Process → select 'linuxcnc' → save .ngc file",
            "Open the .ngc file in a text editor and identify G0, G1, F (feed) commands"
          ]
        },
        {
          id: "a4", levelId: "advanced", num: 18,
          duration: "~50 min",
          title: "Macros and Python Scripting Basics",
          description: "Automate FreeCAD tasks using the built-in Python console and macro system. Record, edit, and run macros to eliminate repetitive work.",
          objectives: [
            "Use the Python console to create objects via script",
            "Record a macro using the Macro recorder",
            "Edit a macro in the built-in macro editor",
            "Understand App.ActiveDocument and the FreeCAD document object model",
            "Run a macro from the macro menu or on a toolbar button"
          ],
          resources: [
            { label: "Macros — Wiki", url: "https://wiki.freecad.org/Macros" },
            { label: "Python Scripting Tutorial — Wiki", url: "https://wiki.freecad.org/Python_scripting_tutorial" },
            { label: "FreeCAD Scripting Basics — Wiki", url: "https://wiki.freecad.org/FreeCAD_Scripting_Basics" },
            { label: "Scripted Objects — Wiki", url: "https://wiki.freecad.org/Scripted_objects" }
          ],
          exercises: [
            "Open the Python console: View → Panels → Python Console",
            "Type: import Part; Part.show(Part.makeBox(50,50,10)) — a box should appear",
            "Record a macro: Macro → Record Macro, create a Pad feature, stop recording",
            "Open the recorded macro (Macro → Macros → Edit) and add a comment explaining each line",
            "Modify the macro to accept a 'thickness' variable and run it with 3 different values",
            "Assign the macro to a custom toolbar button: Tools → Customize → Toolbars"
          ,
            "Model from a photograph: find a photo of a simple mechanical object (e.g. a USB cable clip or a door hinge). Estimate all key dimensions from visual context (compare to known reference objects in the photo). Model the object in FreeCAD with your estimated dimensions. Write the assumptions in a comment at the top of the macro."
          ]
        },
        {
          id: "a5", levelId: "advanced", num: 19,
          duration: "~45 min",
          title: "Expressions and Formula-Driven Design",
          description: "Go beyond spreadsheets — use FreeCAD's expression engine for trigonometric relationships, property cross-references, and conditional geometry.",
          objectives: [
            "Write expressions using math functions (sin, cos, sqrt, abs)",
            "Reference properties of other features (e.g. 'Pad.Length * 0.5')",
            "Use ternary expressions for conditional dimensions",
            "Link properties across documents",
            "Create a self-updating parametric model that enforces design rules",
        {
          id: "a6", levelId: "advanced", num: 20,
          duration: "~50 min",
          title: "Sheet Metal Workbench (Addon)",
          description: "Design sheet metal parts with fold and unfold operations, apply K-factor and bend relief, and export flat patterns as DXF for laser cutting or CNC punching.",
          objectives: [
            "Install the Sheet Metal addon via the Addon Manager",
            "Create a base flange and add bends, hems, and reliefs",
            "Understand K-factor and how it affects flat pattern length",
            "Unfold a sheet metal part to generate its flat pattern",
            "Export the flat pattern as DXF for manufacturing"
          ],
          resources: [
            { label: "Sheet Metal Workbench — GitHub", url: "https://github.com/shaise/FreeCAD_SheetMetal" },
            { label: "Sheet Metal Workbench — Wiki", url: "https://wiki.freecad.org/SheetMetal_Workbench" },
            { label: "Addon Manager — Wiki", url: "https://wiki.freecad.org/Std_AddonMgr" }
          ],
          exercises: [
            "Install the Sheet Metal addon: Tools → Addon Manager → search SheetMetal → Install → restart",
            "Create a 100x60 mm base flange in 1.5 mm steel using Sheet Metal → Make Base Wall",
            "Add a 90° bend along the 60 mm edge using Sheet Metal → Make Fold",
            "Add a hem along the top edge using Sheet Metal → Make Hem",
            "Set K-factor to 0.42 in the properties; unfold the part and verify the flat pattern dimensions",
            "Export the flat pattern as DXF: File → Export → DXF"
          ]
        },
        {
          id: "a7", levelId: "advanced", num: 21,
          duration: "~45 min",
          title: "Rendering & Visualization",
          description: "Produce photorealistic renders of FreeCAD models using the Render workbench or by exporting to Blender, and set up materials and lighting for presentation images.",
          objectives: [
            "Install the Render workbench addon",
            "Apply materials and colours to Part Design features",
            "Set up a basic three-point lighting rig",
            "Render a scene with a PovRay or LuxCore renderer",
            "Export the model as GLTF or OBJ for import into Blender"
          ],
          resources: [
            { label: "Render Workbench — Wiki", url: "https://wiki.freecad.org/Render_Workbench" },
            { label: "Render Workbench — GitHub", url: "https://github.com/FreeCAD/FreeCAD-render" },
            { label: "FreeCAD Import/Export — Wiki", url: "https://wiki.freecad.org/Import_Export" }
          ],
          exercises: [
            "Install the Render workbench via Addon Manager",
            "Open the bracket model; assign a steel material from the Render workbench material library",
            "Create a Render project: Render → New Render Project → choose PovRay",
            "Add a camera and three light sources (key, fill, back); adjust positions in the 3D view",
            "Render the scene and save the output image",
            "Export the model as GLTF: File → Export → GLTF → import into Blender and verify geometry"
          ]
        },
        {
          id: "a8", levelId: "advanced", num: 22,
          duration: "~60 min",
          title: "Arch / BIM Workbench",
          description: "Use the Arch/BIM workbench to model architectural elements — walls, floors, roofs, doors, and windows — and export to the IFC open BIM standard.",
          objectives: [
            "Activate the BIM workbench and understand its site/building/floor hierarchy",
            "Create walls, floors, and slabs from sketch profiles",
            "Insert parametric doors and windows into walls",
            "Add a simple roof using the Arch Roof tool",
            "Export the model as IFC for use in other BIM tools"
          ],
          resources: [
            { label: "BIM Workbench — Wiki", url: "https://wiki.freecad.org/BIM_Workbench" },
            { label: "Arch Workbench — Wiki", url: "https://wiki.freecad.org/Arch_Workbench" },
            { label: "IFC Export — Wiki", url: "https://wiki.freecad.org/Arch_IFC" },
            { label: "BIM Tutorial — Wiki", url: "https://wiki.freecad.org/BIM_ingame_tutorial" }
          ],
          exercises: [
            "Switch to BIM workbench; create a Site, Building, and Floor Level hierarchy",
            "Draw a rectangular floor plan sketch (6x4 m); create 4 walls 2.5 m high from the sketch edges",
            "Add a floor slab 150 mm thick using Arch Floor",
            "Insert a door (900x2100 mm) and two windows (1200x1000 mm) into the walls",
            "Add a gabled roof using Arch Roof",
            "Export as IFC: Arch → Export IFC — open the file in a free IFC viewer to verify"
          ]
        }
          ],
          resources: [
            { label: "Expressions — Wiki", url: "https://wiki.freecad.org/Expressions" },
            { label: "Expression Syntax Reference — Wiki", url: "https://wiki.freecad.org/Expressions#Supported_syntax" }
          ],
          exercises: [
            "Create a box where Pocket depth = 'Pad.Length * 0.4' (always 40% of the pad height)",
            "Add an expression where a slot width = 'sqrt(Pad.Length^2 + Pad.Width^2) * 0.1' (diagonal-based rule)",
            "Create a second sketch dimension that uses 'sin(45 * pi / 180) * 50' to compute an angled offset",
            "Use a ternary: 'Spreadsheet.height > 50 ? 10 : 5' for a fillet radius that adapts to part height",
            "Link a dimension in one document to a property in another: open the expression editor and navigate to 'Document.Feature.Property'"
          ]
        }
      ],
      challenges: [
        {
          id: "ac1",
          type: "Mini Challenge",
          title: "FEM Load Case Comparison",
          description: "Run three FEM analyses on the bracket with different support configurations. Compare max Von Mises stress to determine which configuration is structurally strongest.",
          requirements: [
            "Three separate FEM analyses in the same file (duplicate the Analysis container)",
            "Case 1: Fixed at the two vertical holes, 500N downward load on horizontal face",
            "Case 2: Fixed at all four holes, same 500N load",
            "Case 3: Fixed at both vertical holes + bottom edge, same 500N load",
            "Each analysis run to completion with no solver errors",
            "Max Von Mises stress and max displacement recorded for each case",
            "Mesh element size ≤3 mm for all cases"
          ],
          hints: [
            "Right-click the Analysis container in the Model tree → Duplicate to copy it",
            "Change only the Fixed Constraint selections between cases",
            "The FEM Results object shows max/min values in its properties panel"
          ],
          resources: [
            { label: "FEM Analysis Container — Wiki", url: "https://wiki.freecad.org/FEM_Analysis" }
          ]
        },
        {
          id: "ac2",
          type: "Capstone Challenge",
          title: "Full Assembly with Drawing Package",
          description: "Create a 3-part assembly and a complete engineering drawing package — the kind you'd hand to a manufacturer.",
          requirements: [
            "Three separate part files: base_plate.FCStd, vertical_post.FCStd, cross_arm.FCStd",
            "Assembly file assembly.FCStd with all 3 parts, fully constrained (0 DOF remaining after applying joints)",
            "Exploded view of the assembly created",
            "TechDraw drawing package containing: title block on every sheet, 3 standard views + section view for each part, assembly overview view, Bill of Materials (BOM) table",
            "All critical dimensions on the drawings (overall envelope, hole positions, key features)",
            "Final PDF exported from TechDraw"
          ],
          hints: [
            "Use TechDraw SpreadsheetView for the BOM — link it to a Spreadsheet listing parts",
            "For the exploded view, temporarily offset part positions in the assembly and take a snapshot",
            "Plan your drawing sheet layout before inserting views — use the Page Preview"
          ],
          resources: [
            { label: "TechDraw SpreadsheetView — Wiki", url: "https://wiki.freecad.org/TechDraw_SpreadsheetView" },
            { label: "TechDraw SectionView — Wiki", url: "https://wiki.freecad.org/TechDraw_SectionView" }
          ]
        }
      ]
    },
    {
      id: "expert",
      title: "Expert",
      subtitle: "Scripting, Automation & Contributing",
      color: "#ef4444",
      lessons: [
        {
          id: "e1", levelId: "expert", num: 23,
          duration: "~70 min",
          title: "Advanced Python Scripting & the FreeCAD API",
          description: "Deep dive into the FreeCAD Python API. Create documents, features, and shapes entirely via script and understand the App/Gui separation.",
          objectives: [
            "Use App and Part modules to create geometry from script",
            "Create shapes with Part.makeBox, Part.makeCylinder, Part.makeCompound",
            "Position shapes using Base.Placement and Matrix operations",
            "Understand the App.Document (data) vs Gui.Document (display) split",
            "Write batch-processing scripts that operate on all parts in a directory"
          ],
          resources: [
            { label: "FreeCAD API Reference", url: "https://freecad.github.io/SourceDoc/" },
            { label: "Topological Data Scripting — Wiki", url: "https://wiki.freecad.org/Topological_data_scripting" },
            { label: "Placement — Wiki", url: "https://wiki.freecad.org/Placement" },
            { label: "Code Snippets — Wiki", url: "https://wiki.freecad.org/Code_snippets" }
          ],
          exercises: [
            "Write a Python script that creates a bolt-hole pattern: N holes of diameter D arranged on a bolt circle of radius R (N, D, R as parameters)",
            "Extend the script to use Part.makeCylinder and App.Base.Placement to position each hole",
            "Write a batch script that opens every .FCStd in a folder and exports it as .STEP",
            "Create a compound shape from a list of primitives using Part.makeCompound",
            "Use FreeCAD.Vector and FreeCAD.Matrix to rotate a shape 45° around its center and place a copy"
          ]
        },
        {
          id: "e2", levelId: "expert", num: 24,
          duration: "~75 min",
          title: "Scripted Objects (FeaturePython)",
          description: "Create custom parametric FreeCAD objects that behave like built-in features — with typed properties, auto-recompute on change, and a custom icon.",
          objectives: [
            "Create a FeaturePython class with an execute() method",
            "Add typed properties using addProperty (length, integer, string, bool)",
            "Implement a ViewProvider class for icon display",
            "Understand the recompute cycle and when execute() is called",
            "Save and reload a document containing a scripted object"
          ],
          resources: [
            { label: "Scripted Objects — Wiki", url: "https://wiki.freecad.org/Scripted_objects" },
            { label: "FeaturePython Objects — Wiki", url: "https://wiki.freecad.org/FeaturePython_Objects" },
            { label: "Create a FeaturePython Box (Part I) — Wiki", url: "https://wiki.freecad.org/Create_a_FeaturePython_Box,_Part_I" },
            { label: "ViewProvider — Wiki", url: "https://wiki.freecad.org/Viewprovider" }
          ],
          exercises: [
            "Create a ParametricHexagon class: properties side_length (float), thickness (float), hole_diameter (float)",
            "Implement execute() to build the hexagon profile using Part.makePolygon and Part.Face",
            "Extrude the face by thickness using shape.extrude(FreeCAD.Vector(0,0,thickness))",
            "Subtract the center hole using Part.makeCylinder and Boolean cut",
            "Add a ViewProvider class returning a custom icon path (use any existing SVG from FreeCAD's resources)",
            "Test: save the document, close FreeCAD, reopen — the object should recompute cleanly"
          ]
        },
        {
          id: "e3", levelId: "expert", num: 25,
          duration: "~80 min",
          title: "Custom Workbench Development",
          description: "Package your tools into a proper FreeCAD workbench addon with menus, toolbars, and commands — ready for the Addon Manager.",
          objectives: [
            "Understand the FreeCAD Mod/ directory structure for addons",
            "Create InitGui.py and Init.py entry points",
            "Register a Workbench class with a custom icon and menu",
            "Create a Gui.Command class with IsActive(), Activated(), and GetResources()",
            "Package the addon correctly for the FreeCAD Addon Manager"
          ],
          resources: [
            { label: "Workbench Creation — Wiki", url: "https://wiki.freecad.org/Workbench_creation" },
            { label: "Gui Commands — Wiki", url: "https://wiki.freecad.org/Gui_Command" },
            { label: "FreeCAD Addons on GitHub", url: "https://github.com/FreeCAD/FreeCAD-addons" }
          ],
          exercises: [
            "Create folder: FreeCAD_data/Mod/MyTools/",
            "Create Init.py with a print statement (loaded at FreeCAD start for both GUI and CLI modes)",
            "Create InitGui.py: define a Workbench class, add it to Gui.addWorkbench",
            "Define a command class 'CreateM3Nut': Activated() creates an M3 nut solid via Part scripting",
            "Register the command with Gui.addCommand and add it to the workbench menu and toolbar",
            "Test: restart FreeCAD, switch to MyTools workbench, run the command — M3 nut appears"
          ]
        },
        {
          id: "e4", levelId: "expert", num: 26,
          duration: "~60 min",
          title: "FreeCAD with Git & Version Control",
          description: "Version control FreeCAD .FCStd files (which are ZIP archives) effectively using Git and companion export workflows.",
          objectives: [
            "Understand that .FCStd is a ZIP containing XML + thumbnails",
            "Set up .gitattributes to handle .FCStd as binary (no line-ending mangling)",
            "Establish a companion export workflow: commit .FCStd + .STEP/.STL sidecars",
            "Write meaningful commit messages for CAD changes",
            "Use Git branches for design variants"
          ],
          resources: [
            { label: "FCStd File Format — Wiki", url: "https://wiki.freecad.org/File_Format_FCStd" },
            { label: "FreeCAD Forum — Git discussion", url: "https://forum.freecad.org/viewtopic.php?t=18931" },
            { label: "gitattributes Documentation", url: "https://git-scm.com/docs/gitattributes" }
          ],
          exercises: [
            "Init a Git repo for your FreeCAD projects folder",
            "Create .gitattributes with: *.FCStd binary  *.FCBak binary",
            "Commit the bracket.FCStd file with message 'feat: add base bracket model (80x60x8mm base, 50mm flange)'",
            "Make a design change (increase bracket width to 100mm), export a STEP file, commit both",
            "Create a branch 'variant-thicker-flange', change flange to 12mm, commit",
            "Merge the branch back to main — resolve any issues"
          ,
            "Collaborate on a public repo: fork any public FreeCAD project on GitHub (e.g. from github.com/FreeCAD/FreeCAD-macros). Clone it locally, open one .FCStd file, make a visible design change (change a dimension or add a feature), export a STEP sidecar, commit both files with a descriptive message, push to your fork, and open a draft pull request explaining the change."
          ]
        },
        {
          id: "e5", levelId: "expert", num: 27,
          duration: "~65 min",
          title: "Contributing to FreeCAD",
          description: "Understand FreeCAD's open-source structure, how to report bugs effectively, and how to contribute code, documentation, and translations.",
          objectives: [
            "Navigate the FreeCAD GitHub repository structure",
            "Write a high-quality bug report following the issue template",
            "Make a wiki edit (documentation improvement)",
            "Understand the FreeCAD C++/Python codebase structure at a high level",
            "Submit a documentation pull request on GitHub"
          ],
          resources: [
            { label: "FreeCAD on GitHub", url: "https://github.com/FreeCAD/FreeCAD" },
            { label: "CONTRIBUTING.md", url: "https://github.com/FreeCAD/FreeCAD/blob/main/CONTRIBUTING.md" },
            { label: "Compile on Linux — Wiki", url: "https://wiki.freecad.org/Compile_on_Linux" },
            { label: "FreeCAD Forum", url: "https://forum.freecad.org/" },
            { label: "FreeCAD Wiki — Editing Guide", url: "https://wiki.freecad.org/Help:Editing" }
          ],
          exercises: [
            "Browse github.com/FreeCAD/FreeCAD — explore src/Mod/ to understand how workbenches map to folders",
            "Find an open 'good first issue' in the GitHub Issues tab — read the issue template requirements",
            "Write a mock bug report in a local file following the template (OS, FreeCAD version, steps to reproduce, expected vs actual behavior, screenshots)",
            "Find one outdated or incomplete page on wiki.freecad.org — note what's missing",
            "Fork FreeCAD on GitHub; clone locally; find and fix a documentation comment in a Python file; push to your fork and open a draft PR"
          ]
        }
      ],
      challenges: [
        {
          id: "ec1",
          type: "Mini Challenge",
          title: "FeaturePython Involute Gear",
          description: "Build a FeaturePython object that generates a simplified involute gear profile. Changing any property triggers an automatic clean recompute.",
          requirements: [
            "FeaturePython class with 3 properties: module (float), num_teeth (int), pressure_angle (float)",
            "execute() builds the gear tooth profile using FreeCAD Part geometry (Wire + Face + extrude)",
            "Changing any property in the Properties panel triggers a clean recompute",
            "The generated solid can be used with Pad or other Part Design features",
            "A docstring in execute() explains the simplified involute formula used",
            "No crashes or 'Shape is Null' errors when changing properties to reasonable values"
          ],
          hints: [
            "Look at the FreeCAD Gear workbench source for involute math reference (github.com/looooo/freecad.gears)",
            "A simplified involute: for each tooth angle, compute x = r_base * (cos(t) + t*sin(t)), y = r_base * (sin(t) - t*cos(t))",
            "Use Part.makePolygon on a list of FreeCAD.Vectors to build the gear perimeter",
            "Start with num_teeth=12, module=1 for testing"
          ],
          resources: [
            { label: "FCGear Workbench (reference source) — GitHub", url: "https://github.com/looooo/freecad.gears" }
          ]
        },
        {
          id: "ec2",
          type: "Capstone Challenge",
          title: "Build and Publish a Custom Tool",
          description: "Design and implement a genuinely useful FreeCAD tool that doesn't exist as a built-in feature. Package it, document it, and version-control it.",
          requirements: [
            "Complete, working macro OR workbench command (not just a proof of concept)",
            "Handles at least one error case gracefully (try/except with a FreeCAD.Console.PrintError message)",
            "README.md in the repo describing: what the tool does, how to install and use it, known limitations",
            "At least 3 meaningful Git commits (not just 'initial commit', 'fix', 'done')",
            "Tool works on FreeCAD 1.1+ without requiring additional dependencies",
            "Suggested tools: batch STEP exporter, bolt-pattern generator, sheet metal unfold helper, or anything you need"
          ],
          hints: [
            "Start with a working macro, test it, then promote it to a workbench command",
            "Use FreeCADGui.ActiveDocument.ActiveView.addEventCallback for interactive picker tools",
            "Your commit messages should follow: 'type(scope): description' — e.g. 'feat(exporter): add STEP export loop for all bodies'"
          ],
          resources: [
            { label: "FreeCAD Macros Repository — GitHub", url: "https://github.com/FreeCAD/FreeCAD-macros" },
            { label: "FreeCAD Console API — Wiki", url: "https://wiki.freecad.org/FreeCAD_Console_API" }
          ]
        }
      ]
    }
  ]
};
