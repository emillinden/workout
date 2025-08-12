from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet

# File path
file_path = "/mnt/data/lower_back_rehab_to_strength_plan.pdf"

# Styles
styles = getSampleStyleSheet()
title_style = styles["Heading1"]
subtitle_style = styles["Heading2"]
section_style = styles["Heading3"]
normal_style = styles["BodyText"]

# Document
doc = SimpleDocTemplate(file_path, pagesize=A4)
elements = []

# Title
elements.append(Paragraph("12-Week Lower Back Rehab-to-Strength Plan", title_style))
elements.append(Paragraph("Schedule: Mon (Core+Glutes), Wed (Posterior Chain), Sat (Cardio+Mobility), Sun (Upper Body+Core)", normal_style))
elements.append(Spacer(1, 12))

# Function to create workout day section
def add_day_section(day_name, focus, warmup, table_data, cooldown):
    elements.append(Paragraph(f"{day_name} – {focus}", subtitle_style))
    
    elements.append(Paragraph("Warm-Up (~5 min):", section_style))
    for wu in warmup:
        elements.append(Paragraph(f"• {wu}", normal_style))
    
    elements.append(Spacer(1, 6))
    
    # Table
    t = Table(table_data, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
        ('GRID', (0,0), (-1,-1), 0.5, colors.black),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    elements.append(t)
    
    elements.append(Spacer(1, 6))
    elements.append(Paragraph("Cool-Down (~5 min):", section_style))
    for cd in cooldown:
        elements.append(Paragraph(f"• {cd}", normal_style))
    
    elements.append(PageBreak())

# --- Day 1 ---
warmup_day1 = [
    "Cat-Cow – 6 reps",
    "Hip Circles – 5 each way",
    "Glute Bridge (slow) – 10 reps",
    "Bird Dog (light, 2s hold) – 6 each side",
    "Standing Knee Hugs – 6 each side",
    "Side-to-Side Step with Band – 10 steps each way",
    "Deep Squat Hold with Hip Rock – 30 sec"
]

table_day1 = [
    ["Week", "Bird Dog", "Glute Bridge", "Side Plank", "Band Lateral Walks", "Reverse Plank", "Pallof Press (Wk5+)"],
    ["1", "2×8 (3s)", "2×12 (2s)", "2×20s", "2×8 steps", "2×15s", "-"],
    ["2", "3×8 (3s)", "3×12 (2s)", "3×20s", "3×8 steps", "2×20s", "-"],
    ["3", "3×10 (3s)", "3×14 (2s)", "3×25s", "3×10 steps", "2×25s", "-"],
    ["4", "3×12 (3s)", "3×15 (2s)", "3×30s", "3×12 steps", "2×30s", "-"],
    ["5", "3×12 (4s)", "3×18 (3s)", "3×35s", "3×14 steps", "3×20s", "2×10"],
    ["6", "3×14 (4s)", "3×20 (3s)", "3×40s", "3×16 steps", "3×25s", "3×10"],
    ["7", "4×12 (4s)", "4×20 (3s)", "4×40s", "4×16 steps", "3×30s", "3×12"],
    ["8", "4×14 (4s)", "4×22 (3s)", "4×45s", "4×18 steps", "3×35s", "3×12"],
    ["9", "4×14 (5s)", "4×25 (3s)", "4×50s", "4×20 steps", "3×40s", "3×14"],
    ["10", "4×15 (5s)", "4×25 (3s)", "4×55s", "4×20 steps", "3×45s", "3×14"],
    ["11", "4×16 (5s)", "4×28 (3s)", "4×60s", "4×22 steps", "4×40s", "4×15"],
    ["12", "4×18 (5s)", "4×30 (3s)", "4×70s", "4×24 steps", "4×45s", "4×15"]
]

cooldown_day1 = [
    "Foam roll glutes – 1 min",
    "Foam roll hip flexors – 1 min",
    "Supine hamstring stretch – 30s each",
    "Figure-4 stretch – 30s each",
    "Seated forward fold – 1 min"
]

add_day_section("Monday", "Core Stability + Glute Activation", warmup_day1, table_day1, cooldown_day1)

# --- Day 2 ---
warmup_day2 = [
    "Bodyweight Squat – 10 reps",
    "Leg Swings front/back – 10 each",
    "Hip Openers – 5 each side",
    "Glute Bridge with March – 6 each side",
    "Single-Leg Balance with Arm Reach – 5 each side",
    "Walking Lunge with Twist – 5 each side",
    "Band Good Morning – 10 reps"
]

table_day2 = [
    ["Week", "Single-Leg Deadlift", "Clamshells", "Step-Ups", "Bulgarian Split Squat"],
    ["1", "2×6", "2×12", "2×8", "2×6"],
    ["2", "3×6", "3×12", "3×8", "3×6"],
    ["3", "3×8", "3×14", "3×10", "3×8"],
    ["4", "3×8", "3×15", "3×12", "3×8"],
    ["5", "3×10", "3×16", "3×12", "3×10"],
    ["6", "3×10", "3×18", "3×14", "3×10"],
    ["7", "4×10", "4×18", "4×14", "4×10"],
    ["8", "4×12", "4×20", "4×14", "4×12"],
    ["9", "4×12", "4×22", "4×16", "4×12"],
    ["10", "4×14", "4×22", "4×16", "4×14"],
    ["11", "4×14", "4×24", "4×18", "4×14"],
    ["12", "4×15", "4×25", "4×18", "4×15"]
]

cooldown_day2 = [
    "Foam roll hamstrings – 1 min",
    "Foam roll quads – 1 min",
    "Foam roll calves – 30s each",
    "Pigeon stretch – 30s each",
    "Kneeling hip flexor stretch – 30s each"
]

add_day_section("Wednesday", "Posterior Chain + Lower Body Strength", warmup_day2, table_day2, cooldown_day2)

# --- Day 3 ---
warmup_day3 = [
    "March in place – 40 sec",
    "Arm swings – 40 sec",
    "Hip circles – 40 sec",
    "Bodyweight squats – 10 reps",
    "Torso twist – 10 each side",
    "Ankle circles – 5 each way per leg",
    "Cat-Cow – 6 reps"
]

table_day3 = [
    ["Week", "Cardio (HRmax)", "Mobility Flow"],
    ["1–4", "20–25 min @ 60–70%", "World’s Greatest Stretch, Hip Flexor Stretch, T-Spine Rotations, Child’s Pose"],
    ["5–8", "25–30 min (+1–2 min/week)", "Same as above"],
    ["9–12", "30–35 min (last 5 min intervals)", "Same as above"]
]

cooldown_day3 = [
    "Forward fold hang – 40s",
    "Calf stretch on wall – 30s each",
    "Shoulder stretch across body – 30s each",
    "Standing quad stretch – 30s each",
    "Deep breathing seated – 1 min"
]

add_day_section("Saturday", "Cardio + Mobility Flow", warmup_day3, table_day3, cooldown_day3)

# --- Day 4 ---
warmup_day4 = [
    "Arm Circles – 10 each way",
    "Shoulder Rolls – 10 each way",
    "Band Pull-Aparts – 15 reps",
    "Wall Slides – 8 reps",
    "Plank to Down Dog – 5 reps",
    "Cat-Cow – 6 reps",
    "Scapular Push-Ups – 8 reps"
]

table_day4 = [
    ["Week", "Elevated Push-Up", "Band Row", "Pike Push-Up", "Hollow Hold / Plank Taps (Wk9+)"],
    ["1", "2×8", "2×8", "2×6", "2×15s"],
    ["2", "3×8", "3×8", "3×6", "2×20s"],
    ["3", "3×10", "3×10", "3×8", "3×20s"],
    ["4", "3×10", "3×10", "3×8", "3×25s"],
    ["5", "3×12", "3×12", "3×8", "3×30s"],
    ["6", "3×12", "3×12", "3×10", "3×35s"],
    ["7", "4×12", "4×12", "4×10", "3×40s"],
    ["8", "4×12", "4×14", "4×10", "3×45s"],
    ["9", "4×14", "4×14", "4×12", "4×40s (Plank Taps)"],
    ["10", "4×14", "4×14", "4×12", "4×45s (Plank Taps)"],
    ["11", "4×15", "4×15", "4×12", "4×50s (Plank Taps)"],
    ["12", "4×15", "4×15", "4×14", "4×60s (Plank Taps)"]
]

cooldown_day4 = [
    "Foam roll lats – 1 min",
    "Foam roll mid-back – 1 min",
    "Child’s pose – 1 min",
    "Seated forward fold – 1 min",
    "Neck side stretch – 30s each"
]

add_day_section("Sunday", "Upper Body + Core", warmup_day4, table_day4, cooldown_day4)

# Build PDF
doc.build(elements)

file_path
