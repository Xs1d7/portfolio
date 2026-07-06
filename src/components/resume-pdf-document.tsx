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
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#171717",
    lineHeight: 1.45,
  },
  header: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  name: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  headline: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  contactLine: {
    fontSize: 10,
    color: "#404040",
    marginBottom: 2,
  },
  focusLine: {
    fontSize: 10,
    color: "#404040",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginTop: 12,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  bodyText: {
    fontSize: 11,
    color: "#262626",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginTop: 6,
    marginBottom: 3,
  },
  expBlock: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  expCompany: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  expMeta: {
    fontSize: 10,
    color: "#525252",
    marginBottom: 2,
  },
  expRole: {
    fontSize: 11,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
    marginBottom: 2,
  },
  bullet: {
    fontSize: 10,
    color: "#404040",
    marginLeft: 10,
    marginBottom: 3,
  },
  skillLine: {
    fontSize: 10,
    color: "#404040",
    marginBottom: 4,
  },
  muted: {
    fontSize: 10,
    color: "#525252",
    marginBottom: 3,
  },
  eduBlock: {
    marginBottom: 6,
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

function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((line, i) => (
        <Text key={i} style={styles.bullet}>
          - {line.replace(/^[-•*]\s*/, "")}
        </Text>
      ))}
    </>
  );
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
  const roleMeta = [
    exp.role,
    exp.employmentLabel,
    showTypeBadge ? exp.typeLabel : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <View style={styles.expBlock}>
      <Text style={styles.expCompany}>{exp.company}</Text>
      <Text style={styles.expMeta}>{exp.period}</Text>
      <Text style={styles.expMeta}>{exp.duration}</Text>
      <Text style={styles.expRole}>{roleMeta}</Text>

      <Text style={styles.label}>{labels.sections.impact}</Text>
      <Text style={styles.bodyText}>{exp.impact}</Text>

      {exp.highlights.length > 0 && (
        <>
          <Text style={styles.label}>{labels.sections.highlights}</Text>
          <BulletList items={exp.highlights} />
        </>
      )}

      {exp.exitReason && (
        <>
          <Text style={styles.label}>{labels.sections.exitReason}</Text>
          <Text style={styles.muted}>{exp.exitReason}</Text>
        </>
      )}

      {exp.technologies.length > 0 && (
        <>
          <Text style={styles.label}>{labels.sections.techStack}</Text>
          <Text style={styles.skillLine}>{exp.technologies.join(", ")}</Text>
        </>
      )}
    </View>
  );
}

export function ResumePdfDocument({ data, labels }: Props) {
  const displayName = data.contact.name || labels.name;

  return (
    <Document title={`${displayName} — CV`} author={displayName}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.headline}>{data.headline}</Text>
          <Text style={styles.contactLine}>{data.contact.email}</Text>
          <Text style={styles.contactLine}>{data.contact.phone}</Text>
          <Text style={styles.contactLine}>{data.contact.linkedin}</Text>
          <Text style={styles.contactLine}>{data.contact.github}</Text>
          <Text style={styles.contactLine}>{data.contact.location}</Text>
          {data.focusLabel && (
            <Text style={styles.focusLine}>{data.focusLabel}</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>{labels.sections.summary}</Text>
        <Text style={styles.bodyText}>{data.summary}</Text>

        {data.coreStrengths.length > 0 && (
          <>
            <Text style={styles.subheading}>{labels.sections.coreStrengths}</Text>
            <Text style={styles.bodyText}>{data.coreStrengths.join(", ")}</Text>
          </>
        )}

        <Text style={styles.subheading}>{labels.sections.careerNarrative}</Text>
        <Text style={styles.bodyText}>{data.careerNarrative}</Text>

        {data.skillPillars.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{labels.sections.skills}</Text>
            {data.skillPillars.map((pillar) => (
              <View key={pillar.key}>
                <Text style={styles.subheading}>{pillar.label}</Text>
                <Text style={styles.skillLine}>{pillar.skills.join(", ")}</Text>
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
              <View key={project.id} style={styles.expBlock}>
                <Text style={styles.expCompany}>{project.company}</Text>
                <Text style={styles.expRole}>{project.role}</Text>
                <Text style={styles.expMeta}>
                  {labels.sections.productionTime}: {project.productionDuration}
                </Text>
                <Text style={styles.label}>{labels.sections.impact}</Text>
                <Text style={styles.bodyText}>{project.impact}</Text>
                {project.highlights.length > 0 && (
                  <BulletList items={project.highlights} />
                )}
                {project.technologies.length > 0 && (
                  <Text style={styles.skillLine}>
                    {project.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>{labels.sections.education}</Text>
        {data.education.map((edu) => (
          <View key={edu.institution} style={styles.eduBlock}>
            <Text style={styles.subheading}>
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
        <Text style={styles.bodyText}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join("; ")}
        </Text>
      </Page>
    </Document>
  );
}
