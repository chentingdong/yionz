import data from "./seed.data.json";
import prisma from "./prisma";

const seedTemplates = async () => {
  data.templates.map(async (template) => {
    await prisma.template.upsert({
      where: {
        name: template.name,
      },
      update: {},
      create: template
    });
  });
};

const seedArtifacts = async () => {
  const template = await prisma.template.findUnique({
    where: {
      name: "default"
    }
  });
  console.log(template);
  data.artifacts.map(async (artifact) => {
    await prisma.artifact.create({
      data: {
        name: artifact.name,
        prompt: artifact.prompt,
        story: artifact.story,
        template: {
          connect: {
            id: template?.id
          }
        },
        movie: {},
      }
    });
  });
};
async function main() {
  await seedTemplates();
}

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
