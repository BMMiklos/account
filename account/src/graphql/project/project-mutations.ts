import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import {
  ProjectColumnModel,
  ProjectEntryModel,
  ProjectModel,
} from "../../models/project";
import {
  ColumnCreateInput,
  ColumnType,
  ColumnUpdateInput,
  EntryCreateInput,
  EntryType,
  EntryUpdateInput,
  ProjectCreateInput,
  ProjectType,
  ProjectUpdateInput,
} from "./project-type";

const createProject: GraphQLFieldConfig<any, any, any> = {
  type: ProjectType,
  args: {
    data: { type: GraphQLNonNull(ProjectCreateInput) },
  },
  resolve: async (_, { data }) => {
    let project = new ProjectModel({
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    let result = await project.save();
    return result;
  },
};

const updateProject: GraphQLFieldConfig<any, any, any> = {
  type: ProjectType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProjectUpdateInput) },
  },
  resolve: async (_, { id, data }) => {
    return await ProjectModel.findByIdAndUpdate(id, data)
      .populate({ path: "columns" })
      .populate({ path: "entries" });
  },
};

const deleteProject: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    let projectById = await ProjectModel.findById(id);

    if (projectById) {
      await ProjectColumnModel.updateMany({ project: id }, { project: null });

      await ProjectEntryModel.updateMany({ project: id }, { project: null });
    }

    let result = await ProjectModel.deleteOne({ _id: id });
    return result.deletedCount ? true : false;
  },
};

const createColumn: GraphQLFieldConfig<any, any, any> = {
  type: ColumnType,
  args: {
    project: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ColumnCreateInput) },
  },
  resolve: async (_, { project, data }) => {
    let column;

    let projectById = await ProjectModel.findById(project);

    if (projectById) {
      let document = new ProjectColumnModel({
        title: data.title,
        description: data.description ? data.description : null,
        project: project,
        order: data.order ? data.order : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      column = await document.save();

      await ProjectModel.findByIdAndUpdate(projectById._id, {
        $push: { columns: column._id },
      });
    }

    return column;
  },
};

const updateColumn: GraphQLFieldConfig<any, any, any> = {
  type: ColumnType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ColumnUpdateInput) },
  },
  resolve: async (_, { id, data }) => {
    return await ProjectColumnModel.findByIdAndUpdate(id, data)
      .populate({ path: "project" })
      .populate({ path: "entries" });
  },
};

const deleteColumn: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    let columnById = await ProjectColumnModel.findById(id);

    if (columnById) {
      await ProjectModel.updateMany(
        {
          columns: columnById._id,
        },
        {
          $pull: { columns: columnById._id },
        }
      );
    }

    let result = await ProjectColumnModel.deleteOne({ _id: id });
    return result.deletedCount ? true : false;
  },
};

const createEntry: GraphQLFieldConfig<any, any, any> = {
  type: EntryType,
  args: {
    project: { type: GraphQLNonNull(GraphQLID) },
    column: { type: GraphQLID },
    data: { type: GraphQLNonNull(EntryCreateInput) },
  },
  resolve: async (_, { project, column, data }) => {
    let entry;

    let projectById = await ProjectModel.findById(project);

    if (projectById) {
      if (column) {
        let columnById = await ProjectColumnModel.findById(column);

        if (columnById) {
          entry = await ProjectEntryModel.create({
            project: projectById._id,
            order: data.order,
            title: data.title,
            description: data.description,
          });

          await ProjectColumnModel.updateOne(
            {
              _id: column,
            },
            {
              $push: { entries: entry._id },
            }
          );
        }
      } else {
        entry = await ProjectEntryModel.create({
          project: projectById._id,
          order: data.order,
          title: data.title,
          description: data.description,
        });
      }
    }

    if (entry) {
      await ProjectModel.updateOne(
        {
          _id: project,
        },
        {
          $push: { entries: entry._id },
        }
      );
    }

    return entry;
  },
};

const updateEntry = {
  type: EntryType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(EntryUpdateInput) },
  },
  resolve: async (_, { id, data }) => {
    return await ProjectEntryModel.findByIdAndUpdate(id, data).populate({
      path: "project",
    });
  },
};

const deleteEntry = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    await ProjectModel.updateMany({ entries: id }, { $pull: { entries: id } });
    await ProjectColumnModel.updateMany(
      { entries: id },
      { $pull: { entries: id } }
    );
    let result = await ProjectEntryModel.deleteOne({
      _id: id,
    });
    return result.deletedCount ? true : false;
  },
};

const moveEntry = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    fromColumn: { type: GraphQLID },
    toColumn: { type: GraphQLID },
  },
  resolve: async (_, { id, fromColumn, toColumn }) => {
    let entry = await ProjectEntryModel.findById(id);
    let columnToRemoveFrom = await ProjectColumnModel.findById(fromColumn);
    let columnToInsertTo = await ProjectColumnModel.findById(toColumn);

    let result = true;

    if (entry) {
      if (columnToRemoveFrom) {
        let fromColumnResult = await ProjectColumnModel.findOneAndUpdate(
          {
            _id: fromColumn,
            entries: id,
          },
          { $pull: { entries: id } }
        );
        result = fromColumnResult ? true : false;
      }

      if (columnToInsertTo) {
        let toColumnResult = await ProjectColumnModel.findOneAndUpdate(
          {
            _id: toColumn,
            entries: id,
          },
          { $push: { entries: id } }
        );
        result = toColumnResult ? true : false;
      } else {
        result = false;
      }
    }

    return result;
  },
};

const projectMutations = {
  createProject: createProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
  createColumn: createColumn,
  updateColumn: updateColumn,
  deleteColumn: deleteColumn,
  createEntry: createEntry,
  deleteEnty: deleteEntry,
  updateEntry: updateEntry,
  moveEntry: moveEntry,
};

export default projectMutations;
