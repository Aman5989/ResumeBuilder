import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faEdit, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const ResumeBuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Profile Summary', active: true, description: 'Your Profile Summary' },
    { id: 2, name: 'Academic and Cocurricular Achievements', active: true, description: 'Your Academic and Cocurricular Achievements' },
    { id: 3, name: 'Summer Internship Experience', active: true, description: 'Your Summer Internship Experience' },
    { id: 4, name: 'Work Experience', active: true, description: 'Your Work Experience' },
    { id: 5, name: 'Projects', active: true, description: 'Your Projects' },
    { id: 6, name: 'Certifications', active: true, description: 'Your Certifications' },
    { id: 7, name: 'Leadership Positions', active: true, description: 'Your Leadership Positions' },
    { id: 8, name: 'Extracurricular', active: true, description: 'Your Extracurricular activities' },
    { id: 9, name: 'Education', active: true, description: 'Your educational background' },
  ]);

  const [isModified, setIsModified] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = (e, newIndex) => {
    const oldIndex = e.dataTransfer.getData('index');
    const newSections = [...sections];
    const [removed] = newSections.splice(oldIndex, 1);
    newSections.splice(newIndex, 0, removed);
    setSections(newSections);
    setIsModified(true);
  };

  const handleSectionNameChange = (id, newName) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, name: newName } : section
    );
    setSections(newSections);
    setIsModified(true);
  };

  const handleToggleSection = (id) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, active: !section.active } : section
    );
    setSections(newSections);
    setIsModified(true);
  };

  const handleSave = () => {
    setIsModified(false);
  };

  const [editedSectionId, setEditedSectionId] = useState(null);

  const handleEditSection = (id) => {
    setEditedSectionId(id);
  };

  const handleCancelEdit = () => {
    setEditedSectionId(null);
  };

  const handleUpdateSection = (id, newName) => {
    handleSectionNameChange(id, newName);
    handleCancelEdit();
  };

  return (
    <div className="resume-builder">
      <h1>Select Your Sections</h1>
      <div className="section-list">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="section-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <FontAwesomeIcon icon={faBars} className="drag-icon" /> &nbsp;
            <button className="section-description circle-icon" onClick={() => alert(section.description)}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </button> 
            &nbsp;
            {editedSectionId === section.id ? (
              <>
                <input
                  type="text"
                  className="section-name-input"
                  value={section.name}
                  onChange={(e) => handleSectionNameChange(section.id, e.target.value)}
                />
                <button className="section-edit save-button1" onClick={() => handleUpdateSection(section.id, section.name)}>
                  Save
                </button>
                <button className="section-edit cancel-icon" onClick={handleCancelEdit}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </>
            ) : (
              <>
                <span className="section-name">{section.name}</span>
                <br /> 
                <button className="section-edit edit-icon" onClick={() => handleEditSection(section.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button> &nbsp;
              </>
            )}
            <FontAwesomeIcon
              icon={section.active ? faToggleOn : faToggleOff}
              className={`section-toggle ${section.active ? 'active' : 'inactive'}`}
              onClick={() => handleToggleSection(section.id)}
            /> <br />

          </div>
        ))}
      </div>
      <button className="save-button" onClick={handleSave} disabled={!isModified}>
        Save and Next
      </button>
    </div>
  );
};

export default ResumeBuilder;
