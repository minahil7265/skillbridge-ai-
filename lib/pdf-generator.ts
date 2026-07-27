import { jsPDF } from 'jspdf';
import type { RoadmapResult } from '@/types';

const COLORS = {
  primary: [37, 99, 235] as [number, number, number],
  dark: [15, 23, 42] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  light: [241, 245, 249] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  green: [22, 163, 74] as [number, number, number],
  orange: [234, 88, 12] as [number, number, number],
  red: [220, 38, 38] as [number, number, number],
};

export function generateRoadmapPDF(result: RoadmapResult) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

  // Header band
  setFill(COLORS.primary);
  doc.rect(0, 0, pageWidth, 8, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  setText(COLORS.dark);
  doc.text('SkillBridge AI — Career Roadmap', margin, y + 20);
  y += 36;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  setText(COLORS.muted);
  doc.text(`${result.profile.name}  ·  ${result.profile.careerGoal}`, margin, y);
  y += 16;
  doc.text(`Generated on ${new Date(result.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`, margin, y);
  y += 24;

  // Stats row
  const stats = [
    { label: 'Current Level', value: result.currentLevel },
    { label: 'Target Level', value: result.targetLevel },
    { label: 'Estimated Time', value: `${result.estimatedWeeks} weeks` },
    { label: 'Demand Score', value: `${result.demandScore}/100` },
  ];
  const colW = contentWidth / 4;
  stats.forEach((stat, i) => {
    const x = margin + i * colW;
    setFill(COLORS.light);
    doc.roundedRect(x, y, colW - 8, 48, 6, 6, 'F');
    doc.setFontSize(8);
    setText(COLORS.muted);
    doc.text(stat.label.toUpperCase(), x + 10, y + 16);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    setText(COLORS.dark);
    const valueLines = doc.splitTextToSize(stat.value, colW - 20);
    doc.text(valueLines, x + 10, y + 34);
    doc.setFont('helvetica', 'normal');
  });
  y += 64;

  // Section: Learning Phases
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setText(COLORS.dark);
  doc.text('Learning Phases', margin, y);
  y += 8;
  setDraw(COLORS.light);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  result.phases.forEach((phase, i) => {
    ensureSpace(120);
    const phaseColors: [number, number, number][] = [COLORS.primary, [139, 92, 246], COLORS.green, COLORS.orange];
    const pc = phaseColors[i % phaseColors.length];

    setFill(pc);
    doc.roundedRect(margin, y, 28, 28, 6, 6, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    setText(COLORS.white);
    doc.text(`M${phase.month}`, margin + 6, y + 18);

    setText(COLORS.dark);
    doc.text(`Month ${phase.month}: ${phase.title}`, margin + 40, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setText(COLORS.muted);
    doc.text(phase.focus, margin + 40, y + 26);
    y += 40;

    doc.setFontSize(9);
    setText(COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text('Skills:', margin + 40, y);
    doc.setFont('helvetica', 'normal');
    setText(COLORS.muted);
    const skillsText = phase.skills.join(', ');
    const skillsLines = doc.splitTextToSize(skillsText, contentWidth - 50);
    doc.text(skillsLines, margin + 80, y);
    y += skillsLines.length * 12 + 4;

    doc.setFont('helvetica', 'bold');
    setText(COLORS.dark);
    doc.text('Tasks:', margin + 40, y);
    y += 14;
    doc.setFont('helvetica', 'normal');
    setText(COLORS.muted);
    phase.tasks.forEach((task) => {
      ensureSpace(16);
      const taskLines = doc.splitTextToSize(`•  ${task}`, contentWidth - 50);
      doc.text(taskLines, margin + 50, y);
      y += taskLines.length * 12;
    });

    doc.setFont('helvetica', 'italic');
    setText(COLORS.green);
    const milestoneLines = doc.splitTextToSize(`Milestone: ${phase.milestone}`, contentWidth - 20);
    ensureSpace(milestoneLines.length * 12 + 4);
    doc.text(milestoneLines, margin + 20, y + 4);
    y += milestoneLines.length * 12 + 16;
  });

  // Section: Skill Gap Analysis
  ensureSpace(60);
  doc.addPage();
  y = margin;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setText(COLORS.dark);
  doc.text('Skill Gap Analysis', margin, y);
  y += 8;
  setDraw(COLORS.light);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  const statusColors: Record<string, [number, number, number]> = {
    existing: COLORS.green,
    priority: COLORS.red,
    missing: COLORS.orange,
    optional: COLORS.primary,
  };
  const statusLabels: Record<string, string> = {
    existing: 'Existing',
    priority: 'High Priority',
    missing: 'Missing',
    optional: 'Optional',
  };

  result.skillGaps.forEach((skill) => {
    ensureSpace(24);
    const sc = statusColors[skill.status];
    setFill(sc);
    doc.circle(margin + 4, y - 3, 3, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setText(COLORS.dark);
    doc.text(skill.skill, margin + 16, y);
    doc.setFont('helvetica', 'normal');
    setText(COLORS.muted);
    doc.text(`${statusLabels[skill.status]}  ·  Demand: ${skill.demand}/100`, margin + 180, y);
    // demand bar
    setFill(COLORS.light);
    doc.roundedRect(margin + 360, y - 6, 100, 8, 2, 2, 'F');
    setFill(sc);
    doc.roundedRect(margin + 360, y - 6, skill.demand, 8, 2, 2, 'F');
    y += 18;
  });

  // Section: Projects
  ensureSpace(60);
  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setText(COLORS.dark);
  doc.text('Recommended Projects', margin, y);
  y += 8;
  setDraw(COLORS.light);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  result.projects.forEach((project) => {
    ensureSpace(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setText(COLORS.dark);
    doc.text(project.name, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const dc: [number, number, number] = project.difficulty === 'Beginner' ? COLORS.green : project.difficulty === 'Intermediate' ? COLORS.primary : [139, 92, 246];
    setFill(dc);
    doc.roundedRect(pageWidth - margin - 80, y - 10, 80, 14, 3, 3, 'F');
    setText(COLORS.white);
    doc.text(project.difficulty, pageWidth - margin - 74, y);
    y += 14;

    setText(COLORS.muted);
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(project.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 11 + 2;

    doc.setFontSize(8);
    setText(COLORS.dark);
    doc.text(`Duration: ${project.duration}  ·  Tech: ${project.technologies.join(', ')}`, margin, y);
    y += 12;
    setText(COLORS.muted);
    doc.text(`Skills gained: ${project.skillsGained.join(', ')}`, margin, y);
    y += 18;
  });

  // Section: Resume Tips
  ensureSpace(60);
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setText(COLORS.dark);
  doc.text('AI Resume Tips', margin, y);
  y += 8;
  setDraw(COLORS.light);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  result.resumeTips.forEach((tip) => {
    ensureSpace(20);
    const lines = doc.splitTextToSize(`•  ${tip}`, contentWidth);
    setText(COLORS.muted);
    doc.text(lines, margin, y);
    y += lines.length * 12 + 4;
  });

  // Section: Interview Questions
  ensureSpace(60);
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setText(COLORS.dark);
  doc.text('AI Interview Questions', margin, y);
  y += 8;
  setDraw(COLORS.light);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  result.interviewQuestions.forEach((q) => {
    ensureSpace(20);
    const lines = doc.splitTextToSize(`${result.interviewQuestions.indexOf(q) + 1}. ${q}`, contentWidth);
    setText(COLORS.muted);
    doc.text(lines, margin, y);
    y += lines.length * 12 + 6;
  });

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    setText(COLORS.muted);
    doc.text('Generated by SkillBridge AI', margin, pageHeight - 20);
    doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin - 60, pageHeight - 20);
  }

  doc.save(`skillbridge-roadmap-${result.profile.careerGoal.replace(/\s+/g, '-').toLowerCase()}.pdf`);
}
