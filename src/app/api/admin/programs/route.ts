import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest } from '@/lib/auth';
import { ACADEMIC_PROGRAMS_DATA, AcademicProgramIntelligence } from '@/data/academicIntelligence';

export const dynamic = 'force-dynamic';

interface ProgramDbRow {
  id: string;
  program_code: string;
  title: string;
  short_name: string;
  badge: string;
  headline: string;
  introduction: string;
  target_audience: string;
  exam_name: string;
  conducting_authority: string;
  exam_frequency: string;
  exam_mode: string;
  total_marks: number;
  total_questions: number;
  duration_minutes: number;
  negative_marking_rule: string;
  official_source_title: string;
  official_source_url: string;
  exam_year: string;
  verified_date: string;
  exam_stages_json: string;
  marks_distribution_json: string;
  eligibility_json: string;
  curriculum_json: string;
  learning_journey_json: string;
  student_approach_json: string;
  career_opportunities_json: string;
  faqs_json: string;
  is_published: number;
  created_at: string;
  updated_at: string;
}

// Ensure default seeds in DB
function ensureSeededPrograms() {
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM academic_programs');
  const result = countStmt.get() as { count: number };

  if (result.count === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO academic_programs (
        id, program_code, title, short_name, badge, headline, introduction, target_audience,
        exam_name, conducting_authority, exam_frequency, exam_mode, total_marks, total_questions,
        duration_minutes, negative_marking_rule, official_source_title, official_source_url,
        exam_year, verified_date, exam_stages_json, marks_distribution_json, eligibility_json,
        curriculum_json, learning_journey_json, student_approach_json, career_opportunities_json,
        faqs_json, is_published
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?
      )
    `);

    for (const prog of Object.values(ACADEMIC_PROGRAMS_DATA)) {
      insertStmt.run(
        prog.id,
        prog.programCode,
        prog.title,
        prog.shortName,
        prog.badge,
        prog.headline,
        JSON.stringify(prog.introduction),
        prog.targetAudience,
        prog.examination.examName,
        prog.examination.conductingAuthority,
        prog.examination.annualCadence,
        prog.examination.examMode,
        prog.examination.totalMarks,
        prog.examination.totalQuestions,
        prog.examination.durationMinutes,
        prog.examination.negativeMarkingRule,
        prog.examination.officialSourceTitle,
        prog.examination.officialSourceUrl,
        prog.examination.examYear,
        prog.examination.verifiedDate,
        JSON.stringify(prog.examination.stages),
        JSON.stringify(prog.marksDistribution),
        JSON.stringify(prog.eligibilityAndCutoffs),
        JSON.stringify(prog.curriculum),
        JSON.stringify(prog.learningJourney),
        JSON.stringify(prog.studentApproach),
        JSON.stringify(prog.careerOpportunities),
        JSON.stringify(prog.faqs),
        1
      );
    }
  }
}

// GET all academic programs (Admin protected)
export async function GET(request: NextRequest) {
  const admin = await getAdminSessionFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    ensureSeededPrograms();

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      const stmt = db.prepare('SELECT * FROM academic_programs WHERE program_code = ?');
      const row = stmt.get(code) as ProgramDbRow | undefined;

      if (!row) {
        // Fallback to static code if not found
        if (ACADEMIC_PROGRAMS_DATA[code]) {
          return NextResponse.json({ success: true, program: ACADEMIC_PROGRAMS_DATA[code] });
        }
        return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        program: formatDbRowToProgram(row),
      });
    }

    const rows = db.prepare('SELECT * FROM academic_programs ORDER BY program_code ASC').all() as ProgramDbRow[];
    const programs = rows.map(formatDbRowToProgram);

    return NextResponse.json({
      success: true,
      programs,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

// Helper to convert DB Row to full AcademicProgramIntelligence object
function formatDbRowToProgram(row: ProgramDbRow): AcademicProgramIntelligence {
  const staticFallback = ACADEMIC_PROGRAMS_DATA[row.program_code];

  let introduction = staticFallback ? staticFallback.introduction : {
    heroStatement: row.headline,
    purpose: '',
    examinationReality: '',
    strategicImperative: '',
    competeAcademyPhilosophy: '',
  };
  try {
    introduction = JSON.parse(row.introduction);
  } catch {
    // keep fallback
  }

  let stages = staticFallback ? staticFallback.examination.stages : [];
  try {
    stages = JSON.parse(row.exam_stages_json);
  } catch {
    // keep fallback
  }

  let marksDistribution = staticFallback ? staticFallback.marksDistribution : {
    overview: '',
    rows: [],
    totalCalculatedMarks: row.total_marks,
    scoringStrategy: [],
  };
  try {
    marksDistribution = JSON.parse(row.marks_distribution_json);
  } catch {
    // keep fallback
  }

  let eligibilityAndCutoffs = staticFallback ? staticFallback.eligibilityAndCutoffs : {
    academicPrerequisite: '',
    ageLimitRule: '',
    officialStatutoryNote: '',
    categories: [],
    cutoffsDistinctionExplanation: '',
  };
  try {
    eligibilityAndCutoffs = JSON.parse(row.eligibility_json);
  } catch {
    // keep fallback
  }

  let curriculum = staticFallback ? staticFallback.curriculum : [];
  try {
    curriculum = JSON.parse(row.curriculum_json);
  } catch {
    // keep fallback
  }

  let learningJourney = staticFallback ? staticFallback.learningJourney : [];
  try {
    learningJourney = JSON.parse(row.learning_journey_json);
  } catch {
    // keep fallback
  }

  let studentApproach = staticFallback ? staticFallback.studentApproach : [];
  try {
    studentApproach = JSON.parse(row.student_approach_json);
  } catch {
    // keep fallback
  }

  let careerOpportunities = staticFallback ? staticFallback.careerOpportunities : [];
  try {
    careerOpportunities = JSON.parse(row.career_opportunities_json);
  } catch {
    // keep fallback
  }

  let faqs = staticFallback ? staticFallback.faqs : [];
  try {
    faqs = JSON.parse(row.faqs_json);
  } catch {
    // keep fallback
  }

  return {
    id: row.id,
    programCode: row.program_code,
    title: row.title,
    shortName: row.short_name,
    badge: row.badge,
    targetAudience: row.target_audience,
    headline: row.headline,
    heroBranding: staticFallback?.heroBranding || {
      primarySlogan: row.headline,
      supportingLine: 'We pave the way.',
      supportingDescription: introduction.heroStatement,
    },
    introduction,
    examination: {
      examName: row.exam_name,
      conductingAuthority: row.conducting_authority,
      authorityFull: staticFallback?.examination?.authorityFull || row.conducting_authority,
      annualCadence: row.exam_frequency,
      examMode: row.exam_mode,
      totalMarks: row.total_marks,
      totalQuestions: row.total_questions,
      durationMinutes: row.duration_minutes,
      negativeMarkingRule: row.negative_marking_rule,
      officialSourceTitle: row.official_source_title,
      officialSourceUrl: row.official_source_url,
      examYear: row.exam_year,
      verifiedDate: row.verified_date,
      stages,
    },
    marksDistribution,
    eligibilityAndCutoffs,
    timeManagement: staticFallback?.timeManagement || {
      modeDescription: row.exam_mode,
      recommendedTimePerQuestion: '1 minute per question',
      tacticalPacingStrategy: [],
      negativeMarkingMitigation: [],
    },
    curriculum,
    foundationClassesData: staticFallback?.foundationClassesData,
    learningJourney,
    studentApproach,
    institutionalStrengths: staticFallback?.institutionalStrengths || [],
    careerOpportunities,
    connectedResourceFilter: staticFallback?.connectedResourceFilter || row.program_code,
    faqs,
  };
}

// POST: Admin update or upsert program
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminSessionFromRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      programCode,
      title,
      shortName,
      badge,
      headline,
      targetAudience,
      examName,
      conductingAuthority,
      annualCadence,
      examMode,
      totalMarks,
      totalQuestions,
      durationMinutes,
      negativeMarkingRule,
      officialSourceTitle,
      officialSourceUrl,
      examYear,
      verifiedDate,
    } = body;

    if (!programCode || !title) {
      return NextResponse.json({ success: false, error: 'Program code and title are required' }, { status: 400 });
    }

    const updateStmt = db.prepare(`
      UPDATE academic_programs SET
        title = COALESCE(?, title),
        short_name = COALESCE(?, short_name),
        badge = COALESCE(?, badge),
        headline = COALESCE(?, headline),
        target_audience = COALESCE(?, target_audience),
        exam_name = COALESCE(?, exam_name),
        conducting_authority = COALESCE(?, conducting_authority),
        exam_frequency = COALESCE(?, exam_frequency),
        exam_mode = COALESCE(?, exam_mode),
        total_marks = COALESCE(?, total_marks),
        total_questions = COALESCE(?, total_questions),
        duration_minutes = COALESCE(?, duration_minutes),
        negative_marking_rule = COALESCE(?, negative_marking_rule),
        official_source_title = COALESCE(?, official_source_title),
        official_source_url = COALESCE(?, official_source_url),
        exam_year = COALESCE(?, exam_year),
        verified_date = COALESCE(?, verified_date),
        updated_at = CURRENT_TIMESTAMP
      WHERE program_code = ?
    `);

    const result = updateStmt.run(
      title,
      shortName,
      badge,
      headline,
      targetAudience,
      examName,
      conductingAuthority,
      annualCadence,
      examMode,
      totalMarks,
      totalQuestions,
      durationMinutes,
      negativeMarkingRule,
      officialSourceTitle,
      officialSourceUrl,
      examYear,
      verifiedDate,
      programCode
    );

    if (result.changes === 0) {
      return NextResponse.json({ success: false, error: 'Program not found or unchanged' }, { status: 404 });
    }

    db.prepare(`
      INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
      VALUES (?, 'UPDATE', 'ACADEMIC_PROGRAM', ?, ?, ?)
    `).run(
      `log-${Date.now()}`,
      programCode,
      title,
      admin.email
    );

    return NextResponse.json({ success: true, message: 'Academic program updated successfully' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
