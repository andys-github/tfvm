const {
  fetchTerraformVersions,
  downloadTerraform,
} = require("../services");
const { selectVersion, selectPackage } = require("../prompts");

const download = async (version) => {
  if (version) {
    await selectPackage(version).then(async ({ selectedPackage }) => {
      await downloadTerraform(
        `https://releases.hashicorp.com/terraform/${selectedPackage}`,
        version
      );
    });
  } else {
    let terraformVersions = await fetchTerraformVersions();

    if (terraformVersions.length > 0) {
      selectVersion(terraformVersions).then(async ({ selectedVersion }) => {
        await selectPackage(selectedVersion).then(async ({ selectedPackage }) => {
          await downloadTerraform(
            `https://releases.hashicorp.com/terraform/${selectedPackage}`,
            selectedVersion
          );
        });
      });
    }
  }
};

module.exports = download;
