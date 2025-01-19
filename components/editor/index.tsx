'use client'
// InitializedMDXEditor.tsx
import {
    headingsPlugin,
    listsPlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    quotePlugin,
    type MDXEditorMethods,
    toolbarPlugin,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    UndoRedo,
    Separator,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CreateLink,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    InsertCodeBlock,
    linkPlugin,
    codeBlockPlugin,
    linkDialogPlugin,
    tablePlugin,
    imagePlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
} from '@mdxeditor/editor';
import {basicDark} from 'cm6-theme-basic-dark';
import { useTheme } from 'next-themes';
import type { ForwardedRef } from 'react'
import '@mdxeditor/editor/style.css'
import './dark-editor.css';


interface props {
value: string; 
fieldChange: (value: string) => void;
 editorRef: ForwardedRef<MDXEditorMethods> | null;
}
// Only import this to the next file
const Editor = ({
    value,
    editorRef,
    fieldChange,
    ...props
  } : props) => {

const {resolvedTheme} = useTheme();

const theme = resolvedTheme === 'dark' ? [basicDark] : [];

    return (
        <MDXEditor
        key={resolvedTheme}
        markdown={value}
        className='background-light800_dark200 light-border-2
         markdown-editor dark-editor w-full border'
        onChange={fieldChange}
          plugins={[
            // Example Plugin Usage
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            imagePlugin(),
            codeBlockPlugin(),
            codeMirrorPlugin({
                codeBlockLanguages: {
                    css: "css",
                    txt: "txt",
                    sql: "sql",
                    html: "html",
                    saas: "saas",
                    scss: "scss",
                    bash: "bash",
                    json: "json",
                    js: "javascript",
                    ts: "typescript",
                    "": "unspecified",
                    tsx: "typescript (React)",
                    jsx: "javascript (React)",
                },
                autoLoadLanguageSupport: true,
                codeMirrorExtensions: theme
            }),
            diffSourcePlugin({viewMode: 'rich-text', diffMarkdown: ""}),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
                 toolbarContents: () => (
                    <ConditionalContents
                    options={[
                        {
                            when: (editor) => editor?.editorType === 'codeBlock',
                            contents: () => <ChangeCodeMirrorLanguage />
                        },
                        {
                            fallback: () => (
                                <>
                                <UndoRedo />
                                <Separator />
                                <BoldItalicUnderlineToggles />
                                <Separator />

                                <ListsToggle />
                                <Separator />

                                <CreateLink />
                                <InsertImage />
                                <Separator />

                                <InsertTable />
                                <InsertThematicBreak />

                                <InsertCodeBlock />

                                </>
                            )
                        }
                    ]}
                    />
                 )   
                }
            ),
          ]}
          {...props}
          ref={editorRef}
        />
      )
}

export default Editor