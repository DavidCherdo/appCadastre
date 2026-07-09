let currentRecord = null;

grist.ready({
  columns: [
    { name: "Dossier", title: "Dossier", type: "Text" }
  ],
  requiredAccess: "full"
});

grist.onRecord(function (record) {
  const mapped = grist.mapColumnNames(record);
  if (mapped) {
    currentRecord = record;
    document.getElementById("dossier").value = mapped.Dossier || "";
  }
});

document.getElementById("dossier").addEventListener("change", async (e) => {
  if (!currentRecord) return;
  await grist.getTable().update({
    id: currentRecord.id,
    fields: { Dossier: e.target.value }
  });
});
