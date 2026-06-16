import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumePdfPayload } from "@/data/resume-focus";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: "#171717",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#1d4ed8",
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 3,
  },
  headline: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  contactRow: {
    fontSize: 8.5,
    color: "#525252",
    marginBottom: 1.5,
  },
  focusBadge: {
    fontSize: 7.5,
    color: "#1d4ed8",
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginTop: 10,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  summary: {
    fontSize: 9.5,
    color: "#404040",
    marginBottom: 4,
  },
  narrative: {
    fontSize: 8.5,
    color: "#1d4ed8",
    backgroundColor: "#eff6ff",
    padding: 7,
    borderRadius: 4,
    marginTop: 3,
    marginBottom: 2,
  },
  strengthRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
    marginBottom: 2,
  },
  strengthPill: {
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
  },
  pillarBlock: {
    marginBottom: 5,
  },
  pillarLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#404040",
    marginBottom: 2,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillPill: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 7.5,
  },
  expBlock: {
    marginBottom: 8,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    flex: 1,
  },
  expPeriod: {
    fontSize: 8,
    color: "#525252",
    textAlign: "right",
    maxWidth: "44%",
  },
  expRole: {
    fontSize: 8.5,
    color: "#1d4ed8",
    marginBottom: 3,
  },
  expDuration: {
    fontSize: 7.5,
    color: "#737373",
    marginBottom: 3,
  },
  subLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#404040",
    marginTop: 3,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  impactText: {
    fontSize: 8.5,
    color: "#262626",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 8,
    color: "#404040",
    marginLeft: 6,
    marginBottom: 1.5,
  },
  exitBox: {
    marginTop: 3,
    padding: 5,
    backgroundColor: "#fafafa",
    borderRadius: 3,
  },
  exitText: {
    fontSize: 8,
    color: "#525252",
    fontStyle: "italic",
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 2,
  },
  techPill: {
    fontSize: 7,
    color: "#404040",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  freelanceBlock: {
    marginBottom: 7,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  freelanceDuration: {
    fontSize: 7.5,
    color: "#b45309",
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  eduBlock: {
    marginBottom: 5,
  },
  eduTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
  },
  muted: {
    fontSize: 8.5,
    color: "#525252",
  },
});

export interface ResumePdfLabels {
  name: string;
  sections: {
    summary: string;
    coreStrengths: string;
    skills: string;
    experience: string;
    freelances: string;
    education: string;
    courses: string;
    languages: string;
    careerNarrative: string;
    impact: string;
    highlights: string;
    exitReason: string;
    techStack: string;
    productionTime: string;
  };
}

interface Props {
  data: ResumePdfPayload;
  labels: ResumePdfLabels;
}

function ExperienceBlock({
  exp,
  labels,
  showTypeBadge = true,
}: {
  exp: ResumePdfPayload["experiences"][number];
  labels: ResumePdfLabels;
  showTypeBadge?: boolean;
}) {
  return (
    <View style={styles.expBlock}>
      <View style={styles.expHeader}>
        <Text style={styles.expCompany}>{exp.company}</Text>
        <Text style={styles.expPeriod}>{exp.period}</Text>
      </View>
      <Text style={styles.expRole}>
        {exp.role}
        {exp.employmentLabel ? ` · ${exp.employmentLabel}` : ""}
        {showTypeBadge ? ` · ${exp.typeLabel}` : ""}
      </Text>
      <Text style={styles.expDuration}>{exp.duration}</Text>

      <Text style={styles.subLabel}>{labels.sections.impact}</Text>
      <Text style={styles.impactText}>{exp.impact}</Text>

      {exp.highlights.length > 0 && (
        <>
          <Text style={styles.subLabel}>{labels.sections.highlights}</Text>
          {exp.highlights.map((line, i) => (
            <Text key={i} style={styles.bullet}>
              • {line.replace(/^•\s*/, "")}
            </Text>
          ))}
        </>
      )}

      {exp.exitReason && (
        <>
          <Text style={styles.subLabel}>{labels.sections.exitReason}</Text>
          <View style={styles.exitBox}>
            <Text style={styles.exitText}>{exp.exitReason}</Text>
          </View>
        </>
      )}

      {exp.technologies.length > 0 && (
        <>
          <Text style={styles.subLabel}>{labels.sections.techStack}</Text>
          <View style={styles.techRow}>
            {exp.technologies.map((tech) => (
              <Text key={tech} style={styles.techPill}>
                {tech}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

export function ResumePdfDocument({ data, labels }: Props) {
  return (
    <Document title={`${labels.name} — CV`} author={labels.name}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{labels.name}</Text>
          <Text style={styles.headline}>{data.headline}</Text>
          <Text style={styles.contactRow}>{data.contact.email}</Text>
          <Text style={styles.contactRow}>{data.contact.linkedin}</Text>
          <Text style={styles.contactRow}>{data.contact.github}</Text>
          <Text style={styles.contactRow}>{data.contact.location}</Text>
          {data.focusLabel && (
            <Text style={styles.focusBadge}>{data.focusLabel}</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>{labels.sections.summary}</Text>
        <Text style={styles.summary}>{data.summary}</Text>

        {data.coreStrengths.length > 0 && (
          <>
            <Text style={styles.subLabel}>{labels.sections.coreStrengths}</Text>
            <View style={styles.strengthRow}>
              {data.coreStrengths.map((s) => (
                <Text key={s} style={styles.strengthPill}>
                  {s}
                </Text>
              ))}
            </View>
          </>
        )}

        <Text style={styles.subLabel}>{labels.sections.careerNarrative}</Text>
        <Text style={styles.narrative}>{data.careerNarrative}</Text>

        {data.skillPillars.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{labels.sections.skills}</Text>
            {data.skillPillars.map((pillar) => (
              <View key={pillar.key} style={styles.pillarBlock}>
                <Text style={styles.pillarLabel}>{pillar.label}</Text>
                <View style={styles.skillRow}>
                  {pillar.skills.map((skill) => (
                    <Text key={skill} style={styles.skillPill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.experiences.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {labels.sections.experience}
            </Text>
            {data.experiences.map((exp) => (
              <ExperienceBlock
                key={exp.id}
                exp={exp}
                labels={labels}
              />
            ))}
          </>
        )}

        {data.freelanceProjects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {labels.sections.freelances}
            </Text>
            {data.freelanceProjects.map((project) => (
              <View key={project.id} style={styles.freelanceBlock}>
                <View style={styles.expHeader}>
                  <Text style={styles.expCompany}>{project.company}</Text>
                </View>
                <Text style={styles.expRole}>{project.role}</Text>
                <Text style={styles.freelanceDuration}>
                  {labels.sections.productionTime}: {project.productionDuration}
                </Text>
                <Text style={styles.subLabel}>{labels.sections.impact}</Text>
                <Text style={styles.impactText}>{project.impact}</Text>
                {project.highlights.length > 0 &&
                  project.highlights.map((line, i) => (
                    <Text key={i} style={styles.bullet}>
                      • {line.replace(/^•\s*/, "")}
                    </Text>
                  ))}
                {project.technologies.length > 0 && (
                  <View style={styles.techRow}>
                    {project.technologies.map((tech) => (
                      <Text key={tech} style={styles.techPill}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>{labels.sections.education}</Text>
        {data.education.map((edu) => (
          <View key={edu.institution} style={styles.eduBlock}>
            <Text style={styles.eduTitle}>
              {edu.degree} — {edu.field}
            </Text>
            <Text style={styles.muted}>
              {edu.institution} · {edu.period}
            </Text>
          </View>
        ))}

        {data.courses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>{labels.sections.courses}</Text>
            {data.courses.map((c) => (
              <Text key={c.name} style={styles.muted}>
                {c.name} — {c.institution} ({c.year})
              </Text>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>{labels.sections.languages}</Text>
        <View style={styles.skillRow}>
          {data.languages.map((lang) => (
            <Text key={lang.name} style={styles.skillPill}>
              {lang.name} ({lang.level})
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
