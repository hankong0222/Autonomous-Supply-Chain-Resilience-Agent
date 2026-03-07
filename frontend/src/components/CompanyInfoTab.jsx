function CompanyInfoTab({
  companyName,
  riskTolerance,
  setRiskTolerance,
  suppliers,
  setSuppliers,
  transportTypes,
  setTransportTypes,
  isDragActive,
  setIsDragActive,
  uploadedFiles,
  setUploadedFiles,
  onBack,
  onSubmit,
}) {
  return (
    <div className="auth-layout data-layout">
      <div className="auth-card">
        <header className="auth-header details-header">
          <div className="brand-mark">AS</div>
          <div>
            <h1>Company setup</h1>
            <p className="auth-subtitle">
              Provide operational information used for supply chain risk analysis and
              decision support.
            </p>
          </div>
        </header>

        <div className="company-summary">
          <span className="summary-label">Current company</span>
          <span className="summary-name">{companyName || 'Unnamed company'}</span>
        </div>

        <form className="company-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">Industry</span>
            <select name="industry" defaultValue="">
              <option value="">Select an industry (optional)</option>
              <option value="industrial-transformation">
                Industrial transformation (industrial components)
              </option>
              <option value="automotive">Automotive manufacturing</option>
              <option value="aerospace">Aerospace</option>
              <option value="pharma">Pharmaceuticals</option>
              <option value="logistics">Logistics service provider</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">
              Risk tolerance <span className="risk-value">{riskTolerance}</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(Number(e.target.value))}
            />
            <span className="field-hint">
              0 = Very risk averse, 50 = Balanced, 100 = High risk tolerance.
            </span>
          </label>

          <label className="field">
            <span className="field-label">Main shipping routes</span>
            <textarea
              name="mainRoutes"
              placeholder="Example: Asia → North America (Trans-Pacific), Asia → Europe (Suez)…"
              rows={3}
            />
          </label>

          <label className="field">
            <span className="field-label">Supplier list</span>
            <div className="suppliers-grid">
              {suppliers.map((supplier, index) => (
                <div key={supplier.id} className="supplier-row">
                  <input
                    type="text"
                    placeholder="Supplier name"
                    value={supplier.name}
                    onChange={(e) => {
                      const updated = [...suppliers]
                      updated[index] = { ...supplier, name: e.target.value }
                      setSuppliers(updated)
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={supplier.country}
                    onChange={(e) => {
                      const updated = [...suppliers]
                      updated[index] = { ...supplier, country: e.target.value }
                      setSuppliers(updated)
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Product type"
                    value={supplier.productType}
                    onChange={(e) => {
                      const updated = [...suppliers]
                      updated[index] = { ...supplier, productType: e.target.value }
                      setSuppliers(updated)
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="secondary-button add-supplier-button"
              onClick={() =>
                setSuppliers((prev) => [
                  ...prev,
                  {
                    id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                    name: '',
                    country: '',
                    productType: '',
                  },
                ])
              }
            >
              Add supplier
            </button>
          </label>

          <label className="field">
            <span className="field-label">Transportation types</span>
            <div className="transport-options">
              {['Ocean Freight', 'Air Freight', 'Rail', 'Truck'].map((mode) => (
                <label key={mode} className="transport-chip">
                  <input
                    type="checkbox"
                    checked={transportTypes.includes(mode)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTransportTypes((prev) => [...prev, mode])
                      } else {
                        setTransportTypes((prev) => prev.filter((m) => m !== mode))
                      }
                    }}
                  />
                  <span>{mode}</span>
                </label>
              ))}
            </div>
          </label>

          <label className="field">
            <span className="field-label">Operational budget</span>
            <input
              type="number"
              name="operationalBudget"
              min="0"
              step="1000"
              placeholder="e.g. 2500000"
            />
            <span className="field-hint">Enter the approximate annual operational budget.</span>
          </label>

          <label className="field">
            <span className="field-label">
              Procurement data upload (Excel / CSV)
            </span>
            <div
              className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragActive(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setIsDragActive(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragActive(false)
                const files = Array.from(e.dataTransfer.files || []).filter((file) =>
                  ['.xlsx', '.xls', '.csv'].some((ext) =>
                    file.name.toLowerCase().endsWith(ext),
                  ),
                )
                setUploadedFiles(files.map((f) => f.name))
              }}
            >
              <input
                type="file"
                name="operationsFile"
                accept=".xlsx,.xls,.csv"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  setUploadedFiles(files.map((f) => f.name))
                }}
              />
              <p className="dropzone-title">Drag &amp; drop procurement data here</p>
              <p className="dropzone-subtitle">or click to browse Excel / CSV files</p>
              {uploadedFiles.length > 0 && (
                <p className="dropzone-files">
                  Selected:{' '}
                  {uploadedFiles.length === 1
                    ? uploadedFiles[0]
                    : `${uploadedFiles.length} files`}
                </p>
              )}
            </div>
            <span className="field-hint">
              In a full implementation shipment schedules, supplier lists, inventory, and
              routes would be parsed and stored for risk analysis. This prototype logs
              basic metadata only.
            </span>
          </label>

          <div className="form-footer-actions">
            <button type="button" className="secondary-button" onClick={onBack}>
              Back to Authentication
            </button>
            <button type="submit" className="primary-button">
              Continue to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyInfoTab
