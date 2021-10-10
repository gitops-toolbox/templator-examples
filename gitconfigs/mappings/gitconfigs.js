module.exports.render = function (context) {
  const mapping = {
    locations: [],
  };

  for (repo of Object.keys(context.repos)) {
    const templates = Object.assign(
      context.repos[repo],
      context.common_templates,
    );

    for (const template of Object.keys(templates)) {
      mapping.locations.push({
        contextSelector: `repos.${repo}`,
        template: `${template}.njk`,
        destination: {
          type: "tpd-github",
          params: {
            repo: `gitops-toolbox/${repo}`,
            filepath: ".github/workflows/npm-test.yaml",
          },
        },
      });
    }
  }

  if (process.env.TO_FS === "true") {
    for (const location of mapping.locations) {
      location.destination.type = "tpd-filesystem";
      location.destination.params.baseDir = location.destination.params.repo.replace(
        "gitops-toolbox",
        "../..",
      );
    }
  }

  return mapping;
};
